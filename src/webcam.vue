<template>
  <div>
    <video
      ref="video"
      :width="width"
      :height="height"
      :src="source"
      :autoplay="autoplay"
      :playsinline="playsinline"
    />
    {{lastVideoMode}} {{isFrontCam}}
    {{Contraints}}
  </div>
</template>

<script>
// based from https://github.com/VinceG/vue-web-cam/
import axios from 'axios'
import getUserMedia from 'getusermedia'

export default {
  name: 'vue-cam-vision',
  data () {
    return {
      source: null,
      canvas: null,
      camerasListEmitted: false,
      cameras: [],
      imageCapture: {}, // google image capture
      captures: [],
      imgReport: null,
      lastVideoMode: 'deviceId',
      camsList: { back: null, front: null }
    }
  },
  props: {
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: 500
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    screenshotFormat: {
      type: String,
      default: 'image/jpeg'
    },
    deviceId: {
      type: String,
      default: null
    },
    playsinline: {
      type: Boolean,
      default: true
    },
    mediaConstraints: {
      type: Object,
      default: () => ({
        video: true,
        audio: false
      })
    },
    isFrontCam: {
      type: Boolean,
      default: true
    },
    maxSnapshot: {
      type: [Number],
      default: 3
    },
    googleKey: {
      type: String,
      default: null
    },
    debug: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    deviceId: function (newId, oldId) {
      if (newId !== oldId) {
        this.changeCamera(newId)
      }
    },
    isFrontCam: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        alert(`new ${newValue}`)
        this.changeFrontBack(newValue)
      }
    },
    captures: function (value) {
      this.$emit('capturedImages', value)
    }
  },
  computed: {
    supportFacingMode () {
      let result = ''
      if (navigator.mediaDevices.getSupportedConstraints()["facingMode"]) {
        result = "Supported!"
      } else {
        result = "Not supported!"
      }
      return result
    },
    Contraints () {
      const facingMode = this.mediaConstraints.video.facingMode || (this.isFrontCam ? 'user' : 'environment')
      // let deviceId = ''

      // if (this.lastVideoMode === 'facing') {
      //   if (!this.isFrontCam && this.camsList.back) {
      //     deviceId = this.camsList.back.deviceId
      //   }
      //   if (this.isFrontCam && this.camsList.front) {
      //     deviceId = this.camsList.front.deviceId
      //   }
      // }
      // const video = this.lastVideoMode === 'deviceId' ?
      //   {
      //     ...this.mediaConstraints.video,
      //     ...(this.deviceId ? {
      //       deviceId: { exact: this.deviceId }
      //     } : {})
      //   } :
      //   {
      //     ...deviceId ? { deviceId } : {},
      //     facingMode
      //   }
      const video = {
        ...this.mediaConstraints.video,
        ...(this.deviceId ? {
          deviceId: { exact: this.deviceId }
        } : {}),
        facingMode
      }
      // alert(deviceId)
      // alert(JSON.stringify(this.camsList))
      // alert(JSON.stringify(video))
      return {
        video,
        audio: this.mediaConstraints.audio
      }
    }
  },
  mounted () {

    this.setup()
  },
  methods: {
    loadSrcStream (stream) {
      if ('srcObject' in this.$refs.video) {
        // new browsers api
        try {
          this.$refs.video.srcObject = stream
        } catch (err) {
          console.log(err)
        }
      } else {
        // old broswers
        this.source = window.HTMLMediaElement.srcObject(stream)
      }
      this.video.onloadedmetadata = () => {
        this.video.play()
      }
      this.video.play()
      this.$emit('started', stream)
    },
    changeCamera (deviceId) {
      this.stop()
      this.$emit('camera-change', deviceId)
      this.deviceId = deviceId
      this.loadCamera()
    },
    async loadCameras () {
      try {
        const deviceInfos = await navigator.mediaDevices.enumerateDevices()
        if (this.debug) console.log(deviceInfos)
        deviceInfos.forEach((deviceInfo) => {
          if (deviceInfo.kind === 'videoinput') {
            this.cameras.push(deviceInfo)
            if (deviceInfo.label.toLowerCase().indexOf('back') !== -1) {
              this.camsList.back = deviceInfo
            }
            if (deviceInfo.label.toLowerCase().indexOf('front') !== -1) {
              this.camsList.front = deviceInfo
            }
          }
        })

        if (!this.camerasListEmitted) {
          this.$emit('cameras', this.cameras)
          this.camerasListEmitted = true
        }
      } catch (err) {
        this.$emit('notsupported', err)
        console.log(err)
      }
    },
    stopStreamedVideo (videoElem) {
      const stream = videoElem.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => {
        // stops the video track
        track.stop()
        this.$emit('stopped', stream)
        this.$refs.video.srcObject = null
        this.source = null
      })
    },
    // Stop the video
    stop () {
      if (this.$refs.video !== null && this.$refs.video.srcObject) {
        if (this.debug) console.log('stoping')
        this.stopStreamedVideo(this.$refs.video)
      }
    },
    async setup () {
      await this.loadCameras()
      this.start()
    },
    // Start the video
    start () {
      this.loadCamera()
    },
    isMobile () {
      return typeof window.orientation !== 'undefined'
    },
    toggleFrontBack () {
      this.isFrontCam = !this.isFrontCam
    },
    changeFrontBack (newFrontCam) {
      if (newFrontCam && this.camsList.front) {
        this.changeCamera(this.camsList.front.deviceId)
      }
      if (!newFrontCam && this.camsList.back) {
        this.changeCamera(this.camsList.back.deviceId)
      }
    },
    loadCamera () {
      if (this.debug) console.log(this.Contraints)
      getUserMedia(this.Contraints, (err, stream) => {
        if (err) {
          this.$emit('error', err)
          console.log('failed to get user camera')
          return
        }
        // console.log('Got stream', stream)
        if (window.ImageCapture) {
          const mediaStreamTrack = stream.getVideoTracks()[0]
          this.imageCapture = new ImageCapture(mediaStreamTrack)
        }
        this.video = this.$refs.video
        this.loadSrcStream(stream)
      })
    },
    async capture () {
      if (window.ImageCapture) {
        const gURL = await this.gCapture()
        return gURL
      }
      this.canvas = this.getCanvas()
      const URL = this.canvas.toDataURL(this.screenshotFormat, 1)
      this.saveSnapShot(URL)
      return URL
    },
    saveSnapShot (URL) {
      if (this.captures.length > this.maxSnapshot) {
        this.captures.shift()
      }
      this.captures.push({
        image: URL,
        imgReport: {}
      })
      // console.log(URL)
      return URL
    },
    async gCapture () {
      const blob = await this.imageCapture.takePhoto()
      const reader = new FileReader()
      let URL = null
      return new Promise((resolve, reject) => {
        reader.onerror = (err) => {
          console.error(err)
          reader.abort()
          reject()
        }
        reader.onloadend = () => {
          URL = reader.result
          this.saveSnapShot(URL)
          if (this.debug) console.log(URL)
          resolve(URL)
        }
        reader.readAsDataURL(blob)
      })
    },
    getCanvas () {
      const video = this.$refs.video
      if (!this.ctx) {
        const canvas = document.createElement('canvas')
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
      }
      const { ctx, canvas } = this
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      return canvas
    },
    /* type = 
    'LABEL_DETECTION': Labels can identify objects, locations, activities, animal species, products, and more.
    'TEXT_DETECTION': (OCR TEXT_DETECTION detects and extracts text from any image), 
    'DOCUMENT_TEXT_DETECTION': DOCUMENT_TEXT_DETECTION extracts text from an image; the response is optimized for dense text and documents. The JSON includes page, block, paragraph, word, and break information
    */
    async googleVision (type = "LABEL_DETECTION", index) {
      if (!this.googleKey) {
        console.log("no google key detected")
        return
      }
      const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${this.googleKey}`
      let imgIndex = index
      if (!index || typeof index === 'undefined') {
        imgIndex = this.captures.length - 1
      }
      const sendData = {
        requests: [{
          image: {
            content: this.captures[imgIndex].image
              .replace('data:image/jpeg;base64,', '')
          },
          features: { type }
        }]
      }
      const { data } = await axios.post(
        API_URL,
        sendData
      )
      if (data && data.responses[0]) {
        this.imgReport = data.responses[0]
        this.captures[imgIndex].imgReport = data.responses[0]
      }
      if (this.debug) console.log(this.imgReport)
      this.$emit('googleReport', this.imgReport)
      return this.imgReport
    }
  }
}
</script>