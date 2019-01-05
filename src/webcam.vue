<template>
  <video
    ref="video"
    :width="width"
    :height="height"
    :src="source"
    :autoplay="autoplay"
    :playsinline="playsinline"
  />
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
      currentId: null,
      imgReport: null
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
    }
  },
  watch: {
    deviceId: function (id) {
      this.changeCamera(id)
    },
    isFrontCam: function (value) {
      this.changeFront(value)
    }
  },
  computed: {
    currentDeviceId () {
      return this.deviceId || this.currentId
    },
    Contraints () {
      return {
        video: {
          ...this.mediaConstraints.video,
          ...(this.deviceId ? {
            deviceId: { exact: this.deviceId }
          } : {}),
          facingMode: this.mediaConstraints.video.facingMode || (this.isFrontCam ? 'user' : 'environment')
        },
        audio: this.mediaConstraints.audio
      }
    }
  },
  mounted () {
    if (this.isMobile()) { // mobile use backcam as default unless is set
      this.isFrontCam = this.mediaConstraints.video.facingMode || false
    }
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
      this.loadCamera(deviceId)
    },
    async loadCameras () {
      try {
        const deviceInfos = await navigator.mediaDevices.enumerateDevices()
        console.log(deviceInfos)
        deviceInfos.forEach((deviceInfo) => {
          if (deviceInfo.kind === 'videoinput') {
            this.cameras.push(deviceInfo)
            if (deviceInfo) {
              this.currentId = deviceInfo.deviceId
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
        this.stopStreamedVideo(this.$refs.video)
      }
    },
    async setup () {
      await this.loadCameras()
      this.start()
    },
    // Start the video
    start () {
      if (this.currentDeviceId) {
        this.loadCamera(this.currentDeviceId)
      }
    },
    isMobile () {
      return typeof window.orientation !== 'undefined'
    },
    toggleFrontBack () {
      this.isFrontCam = !this.isFrontCam
    },
    changeFront (value) {
      this.isFrontCam = value
      this.loadCamera()
    },
    loadCamera () {
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
          // console.log(URL)
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
    async googleVision (index, type = "LABEL_DETECTION") {
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
      console.log(this.imgReport)
      this.$emit('googleReport', this.imgReport)
      return this.imgReport
    }
  }
}
</script>