import React from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import * as credentials from './config';
const OT = require('@opentok/client');

export default class VideoChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true,
    };

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({ connection: 'Connected' });
      },
      sessionDisconnected: () => {
        this.setState({ connection: 'Disconnected' });
      },
      sessionReconnected: () => {
        this.setState({ connection: 'Reconnected' });
      },
      sessionReconnecting: () => {
        this.setState({ connection: 'Reconnecting' });
      },
    };

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source');
      },
      streamCreated: () => {
        console.log('Publisher stream created');
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
      },
    };

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled');
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled');
      },
    };
  }

  onSessionError = error => {
    this.setState({ error });
  };

  onPublish = () => {
    console.log('Publish Success');
  };

  onPublishError = error => {
    this.setState({ error });
  };

  onSubscribe = () => {
    console.log('Subscribe Success');
  };

  onSubscribeError = error => {
    this.setState({ error });
  };

  toggleVideo = () => {
    this.setState(state => ({
      publishVideo: !state.publishVideo,
    }));
  };

  render() {
    const apiKey = credentials.API_KEY;
    // const sessionId = localStorage.getItem("sessionid");
    // const token = localStorage.getItem("tokenid");
    const sessionId = "1_MX40NzE2NzgxNH5-MTYyMjM1NTE4MjkzN35NUjltY2wvOHJOY3pXM2g2aTFFZWJwREl-fg";
    const token = "T1==cGFydG5lcl9pZD00NzE2NzgxNCZzaWc9MzE3YjI0ZjRmODBiYWJlNzBhOGFmMDA5MzkwMTI2NDZhNTcxNjY2OTpzZXNzaW9uX2lkPTFfTVg0ME56RTJOemd4Tkg1LU1UWXlNak0xTlRFNE1qa3pOMzVOVWpsdFkyd3ZPSEpPWTNwWE0yZzJhVEZGWldKd1JFbC1mZyZjcmVhdGVfdGltZT0xNjIyMzU1MjA4Jm5vbmNlPTAuMTc1ODI1OTEzNzU0MTExODMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYyMjk2MDAwOCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";
    console.log("Session main is "+sessionId);
    console.log("Token main is "+token);

    const { error, connection, publishVideo } = this.state;
    return (
        <div>
          <div id="sessionStatus">Session Status: {connection}</div>
          {error ? (
              <div className="error">
                <strong>Error:</strong> {error}
              </div>
          ) : null}
          <OTSession
              apiKey={apiKey}
              sessionId={sessionId}
              token={token}
              onError={this.onSessionError}
              eventHandlers={this.sessionEventHandlers}
          >
            <button id="videoButton" onClick={this.toggleVideo}>
              {publishVideo ? 'Disable' : 'Enable'} Video
            </button>
            <OTPublisher
                properties={{ publishVideo, width: 500, height: 500, }}
                onPublish={this.onPublish}
                onError={this.onPublishError}
                eventHandlers={this.publisherEventHandlers}
            />
            <OTStreams>
              <OTSubscriber
                  properties={{ width: 200, height: 200 }}
                  onSubscribe={this.onSubscribe}
                  onError={this.onSubscribeError}
                  eventHandlers={this.subscriberEventHandlers}
              />
            </OTStreams>
          </OTSession>
        </div>
    );
  }
}
