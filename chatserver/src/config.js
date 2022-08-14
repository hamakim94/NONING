const config = {
  listenIp: '0.0.0.0',
  listenPort: 3001,
  sslCrt: '/etc/ssl/certs/ssl-cert-snakeoil.pem',
  sslKey: '/etc/ssl/private/ssl-cert-snakeoil.key',
  mediasoup: {
    // Worker settings
    worker: {
      rtcMinPort: 8500,
      rtcMaxPort: 8700,
      logLevel: 'warn',
      logTags: [
        'info',
        'ice',
        'dtls',
        'rtp',
        'srtp',
        'rtcp',
        // 'rtx',
        // 'bwe',
        // 'score',
        // 'simulcast',
        // 'svc'
      ],
    },
    // Router settings
    router: {
      mediaCodecs: [
        {
          kind: 'audio',
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2,
        },
        {
          kind: 'video',
          mimeType: 'video/VP8',
          clockRate: 90000,
          parameters: {
            'x-google-start-bitrate': 1000,
          },
        },
      ],
    },
    // WebRtcTransport settings
    webRtcTransport: {
      listenIps: [
        {
          ip: '0.0.0.0',
          announcedIp: 'i7a202.p.ssafy.io',
        },
      ],
      maxIncomingBitrate: 1500000,
      initialAvailableOutgoingBitrate: 1000000,
    },
  },
};

export default config;
