<template>
  <v-app>
    <v-content>
      <v-container
        grid-list-md
        text-xs-center
      >
        <v-layout
          row
          wrap
        >
          <v-flex xs6>
            <v-card
              dark
              color="primary"
            >
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  camera
                </v-icon>
                <span
                  class="title font-weight-light"
                  v-if="device"
                >
                  {{ device.label }}
                </span>
              </v-card-title>
              <v-card-text class="px-0">
                <web-cam
                  ref="webcam"
                  width="100%"
                  :deviceId="deviceId"
                  @started="onStarted"
                  @stopped="onStopped"
                  @error="onError"
                  @cameras="onCameras"
                  @camera-change="onCameraChange"
                  :isFrontCam="frontCam"
                />

              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card>
              <v-avatar
                tile="tile"
                size="100%"
                color="grey lighten-4"
              ><img
                  :src="img"
                  aspect-ratio="2.75"
                />
              </v-avatar>
              <v-card-title primary-title>
                Captured Image
              </v-card-title>

              <v-card-title v-if="report">
                Google is guessing
                <v-chip
                  v-for="(data,index) in report"
                  :key="index"
                  color="green"
                  text-color="white"
                >
                  <v-avatar class="green darken-4">{{data.score | percent}}</v-avatar>
                  {{data.description}}
                </v-chip>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  flat
                  color="orange"
                  @click="sendGVision"
                  :disabled="!img"
                >Google vision Analayis</v-btn>
              </v-card-actions>
            </v-card>

          </v-flex>
          <v-select
            xs4
            :items="devices"
            label="Select Device"
            item-text="label"
            item-value="deviceId"
            v-model="camera"
          ></v-select>
          <v-switch
            xs4
            color="warning"
            :label="`Front cam: ${frontCam.toString()}`"
            v-model="frontCam"
          ></v-switch>
          <v-btn
            xs3
            color="primary"
            @click="onCapture"
          >Capture Photo <v-icon>camera</v-icon>
          </v-btn>
          <v-btn
            xs3
            color="error"
            @click="onStop"
          >Stop Camera</v-btn>
          <v-btn
            xs3
            color="success"
            @click="onStart"
          >Start Camera</v-btn>

        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { WebCam } from 'plugin';
import { find, head } from 'lodash';
export default {
  name: 'app',
  components: {
    WebCam
  },
  data () {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      frontCam: true,
      report: null
    };
  },
  computed: {
    device: function () {
      return find(this.devices, n => n.deviceId == this.deviceId);
    }
  },
  watch: {
    camera: function (id) {
      this.deviceId = id;
    },
    devices: function () {
      // Once we have a list select the first one
      let first = head(this.devices);
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }
  },
  methods: {
    async sendGVision () {
      const { labelAnnotations } = await this.$refs.webcam.googleVision();
      this.report = labelAnnotations
    },
    async onCapture () {
      this.img = await this.$refs.webcam.capture();
    },
    onStarted (stream) {
      console.log('On Started Event', stream);
    },
    onStopped (stream) {
      console.log('On Stopped Event', stream);
    },
    onStop () {
      this.$refs.webcam.stop();
    },
    onStart () {
      this.$refs.webcam.start();
    },
    onError (error) {
      console.log('On Error Event', error);
    },
    onCameras (cameras) {
      this.devices = cameras;
      console.log('On Cameras Event', cameras);
    },
    onCameraChange (deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId
      console.log('On Camera Change Event', deviceId);
    }
  },
  filters: {
    percent: function (value) {
      if (!value) return ''
      return (Math.floor((value) * 10000) / 100).toFixed(0) + '%'
    }
  }
};
</script>
