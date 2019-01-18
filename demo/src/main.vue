<template>
  <v-app>
    <v-content>
      <v-toolbar
        color="primary"
        dark
      >
        <v-menu :nudge-width="100">
          <v-toolbar-title slot="activator">
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <span>vue-cam-vision</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
          <v-list>
            <v-list-tile
              v-for="item in items"
              :key="item"
              @click="item.href"
            >
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>
            <a href="https://github.com/kelvin2go/vue-cam-vision">
              <svg
                height="32"
                class="octicon octicon-mark-github"
                viewBox="0 0 16 16"
                version="1.1"
                width="32"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </a>
          </v-btn>
          <v-btn flat>
            <a
              href="https://www.linkedin.com/in/kelvinhoucsd"
              style="height:32px;width:32px;"
            >
              <svg
                style="height:100%;width:100%;"
                preserveAspectRatio="xMinYMin meet"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  class="scaling-icon"
                  style="fill-opacity: 1"
                >
                  <g
                    class="bug-28dp"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g class="dp-1">
                      <path
                        d="M25.375,0 L2.625,0 C1.175,0 0,1.175 0,2.625 L0,25.375 C0,26.825 1.175,28 2.625,28 L25.375,28 C26.825,28 28,26.825 28,25.375 L28,2.625 C28,1.175 26.825,0 25.375,0"
                        class="bug-text-color"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        d="M25.375,0 L2.625,0 C1.175,0 0,1.175 0,2.625 L0,25.375 C0,26.825 1.175,28 2.625,28 L25.375,28 C26.825,28 28,26.825 28,25.375 L28,2.625 C28,1.175 26.825,0 25.375,0 Z M14.8747,12.025 L14.8747,10 L10.9997,10 L10.9997,24 L14.9997,24 L14.9997,17.375 C14.9997,15.603 15.6627,13.875 17.6497,13.875 C19.4667,13.875 19.9997,14.965 19.9997,16.875 L19.9997,24 L23.9997,24 L23.9997,14.975 C23.9997,11.75 22.2917,9.875 19.0137,9.875 C16.9227,9.875 15.4487,11.025 14.8747,12.025 Z M4,24 L8,24 L8,10 L4,10 L4,24 Z M6,3.665 C4.71,3.665 3.665,4.71 3.665,6 C3.665,7.29 4.71,8.335 6,8.335 C7.29,8.335 8.335,7.29 8.335,6 C8.335,4.71 7.29,3.665 6,3.665 Z"
                        class="background"
                        fill="#0077B5"
                      ></path>
                    </g>
                    <g
                      class="dpi-gt1"
                      transform="scale(0.5833)"
                    >
                      <rect
                        class="bug-text-color"
                        fill="#FFFFFF"
                        x="1"
                        y="1"
                        width="46"
                        height="46"
                        rx="4"
                      ></rect>
                      <path
                        d="M0,4.00989318 C0,1.79529033 1.79405245,0 4.00989318,0 L43.9901068,0 C46.2047097,0 48,1.79405245 48,4.00989318 L48,43.9901068 C48,46.2047097 46.2059475,48 43.9901068,48 L4.00989318,48 C1.79529033,48 0,46.2059475 0,43.9901068 L0,4.00989318 Z M19,18.3 L25.5,18.3 L25.5,21.566 C26.437,19.688 28.838,18 32.445,18 C39.359,18 41,21.738 41,28.597 L41,41.3 L34,41.3 L34,30.159 C34,26.253 33.063,24.05 30.68,24.05 C27.375,24.05 26,26.425 26,30.159 L26,41.3 L19,41.3 L19,18.3 Z M7,41 L14,41 L14,18 L7,18 L7,41 Z M15,10.5 C15,12.985 12.985,15 10.5,15 C8.015,15 6,12.985 6,10.5 C6,8.015 8.015,6 10.5,6 C12.985,6 15,8.015 15,10.5 Z"
                        class="background"
                        fill="#0077B5"
                      ></path>
                    </g>
                  </g>
                  <g
                    class="bug-34dp"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g class="dp-1">
                      <path
                        d="M2.8,34 L31.2,34 C32.746,34 34,32.746 34,31.2 L34,2.8 C34,1.254 32.746,0 31.2,0 L2.8,0 C1.254,0 0,1.254 0,2.8 L0,31.2 C0,32.746 1.254,34 2.8,34"
                        class="bug-text-color"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        d="M2.8,34 L31.2,34 C32.746,34 34,32.746 34,31.2 L34,2.8 C34,1.254 32.746,0 31.2,0 L2.8,0 C1.254,0 0,1.254 0,2.8 L0,31.2 C0,32.746 1.254,34 2.8,34 Z M13,13 L17.75,13 L17.75,15.391 C18.387,14.114 20.242,12.75 22.695,12.75 C27.397,12.75 29,14.875 29,19.922 L29,29 L24,29 L24,20.984 C24,18.328 23.481,16.875 21.542,16.875 C18.921,16.875 18,18.867 18,20.984 L18,29 L13,29 L13,13 Z M5,29 L10,29 L10,13 L5,13 L5,29 Z M10.55,7.5 C10.55,9.184 9.184,10.55 7.5,10.55 C5.816,10.55 4.45,9.184 4.45,7.5 C4.45,5.815 5.816,4.45 7.5,4.45 C9.184,4.45 10.55,5.815 10.55,7.5 Z"
                        class="background"
                        fill="#0077B5"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </a>
          </v-btn>
          <v-btn flat>
            <a
              href="https://kelvinho.js.org"
              style="height:32px;width:32px;"
            ><img src="https://img.icons8.com/material/24/000000/home-page.png">
            </a></v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container
        grid-list-md
        text-xs-center
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            md6
          >
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
                  :debug="true"
                />
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex
            xs12
            md6
          >
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
      report: null,

      items: [
        {
          href: "https://kelvinho.js.org",
          name: 'Home'
        },
        {
          href: "https://github.com/kelvin2go/vue-cam-vision",
          name: 'Git'
        },
        {
          href: "https://www.linkedin.com/in/kelvinhoucsd",
          name: 'LinkedIn'
        }
      ]
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
      if (typeof window.orientation === 'undefined') {
        // Once we have a list select the first one
        let first = head(this.devices);
        if (first) {
          this.camera = first.deviceId;
          this.deviceId = first.deviceId;
        }
      } else {
        this.frontCam = false
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
