import React, { Component } from 'react'
import GoogleAd from 'react-google-ad'

export default class MountAd extends Component {
	render() {
		return (
			<div className={ 'google-ad google-ad--' + this.props.type }>
				<GoogleAd
					client="ca-pub-9211196233969408"
					slot={ this.props.slot }
					format={ this.props.format }
				/>
			</div>
		)
	}
}