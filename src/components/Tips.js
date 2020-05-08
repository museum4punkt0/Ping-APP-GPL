import React from 'react';
import {Modal, View, Dimensions} from 'react-native';
import { Svg, Defs, Rect, Mask, Circle, Use } from 'react-native-svg';
import PropTypes from 'prop-types';
import styles from '../config/styles';
import Text from './Text';
import Button from './Button';
import strings from '../config/localization';

class Tips extends React.Component {
  state = {
    bottomPosition: 25
  }

  componentDidMount = () => {
    const {screen, position} = this.props;
    if (screen === 'tinder' || screen === 'collection' && position >= 3 || screen === 'discoverRooms' && position.vertical < 500) {
      this.setState({
        bottomPosition: Dimensions.get('screen').height/2
      });
    } else if (screen === 'collection' && position < 3) {
      this.setState({
        bottomPosition: 25
      });
    } else if (screen === 'discoverRooms' && position.vertical > 500) {
      this.setState({
        bottomPosition: Dimensions.get('screen').height - position.vertical
      })
    }
  }
  renderCircle = (screen, position) => {
    const width = Dimensions.get('window').width, height = Dimensions.get('window').height;
    switch (screen) {
      case 'matchScreen':
        return (
          <Defs>
            <Mask id="mask" x="0" y="0" height={height} width={width}>
              <Rect height="100%" width="100%" fill="white" />
              <Circle id="Circle" r={width/2} cx={width/2} cy={height - width/2 - 155 - 155} stroke="green" strokeWidth="4" />
            </Mask>
            <Circle id="Circle" r={width/2} cx={width/2} cy={height - width/2 - 155 - 155} stroke="green" strokeWidth="4" />
          </Defs>
        );
      
      case 'discoverRooms':
        return (
          <Defs>
            <Mask id="mask" x="0" y="0" height={height} width={width}>
              <Rect height="100%" width="100%" fill="white" />
              <Circle id="Circle" r={100} cx={position.horizontal/2} cy={position.vertical/2} stroke="green" strokeWidth="4" />
            </Mask>
            <Circle id="Circle" r={100} cx={position.horizontal/2} cy={position.vertical/2} stroke="green" strokeWidth="4" />
          </Defs>
        );

      case 'tinder':
        return (
          <Defs>
            <Mask id="mask" x="0" y="0" height={height} width={width}>
              <Rect height="100%" width="100%" fill="white" />
              <Circle id="Circle" r={100} cx={width/2 - 90} cy={height - width/3} stroke="green" strokeWidth="4" />
            </Mask>
            <Circle id="Circle" r={100} cx={width/2 - 90} cy={height - width/3} stroke="green" strokeWidth="4" />
          </Defs>
        );
        
      case 'collection':
        // eslint-disable-next-line no-case-declarations
        let cx = width/2;
        if (position.horizontal === 1) {
         cx = 60;
        } else if (position.horizontal === 3) {
          cx = width/2 + 3*40;
        } 
        return (
          <Defs>
            <Mask id="mask" x="0" y="0" height={height} width={width}>
              <Rect height="100%" width="100%" fill="white" />
              <Circle id="Circle" r={90} cx={cx} cy={position.vertical*180} stroke="green" strokeWidth="4" />
            </Mask>
            <Circle id="Circle" r={90} cx={cx} cy={position.vertical*180} stroke="green" strokeWidth="4" />
          </Defs>
        );
      default:
        return null;
    }
  }
  render(){
    const {onRequestClose, visible, screen, title, position} = this.props;
    const {bottomPosition} = this.state;
    const width = Dimensions.get('window').width, height = Dimensions.get('window').height;
    return (
      <View>
        <Modal visible={visible} onRequestClose={onRequestClose} transparent>
          <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
            {this.renderCircle(screen, position)}
            <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.9)" mask="url(#mask)" fill-opacity="0" />
            <Use href="#Circle" fill="none" />
          </Svg>
          <View style={[styles.main.dialogContentContainer, {position:'absolute', alignSelf:'center', bottom: bottomPosition}]}> 
            <Text style={styles.main.dialogContentText}>{title}</Text>
            <Button onPress={onRequestClose} title={strings.gotIt} />            
          </View>
        </Modal>
      </View>
    )
  }
}

Tips.propTypes = {
  onRequestClose: PropTypes.func,
  visible: PropTypes.bool,
  screen: PropTypes.string,
  title: PropTypes.string,
  position: PropTypes.object,
}

Tips.defaultProps = {
  onRequestClose: () => {},
  visible: false,
  screen: '',
  title: '',
  position: {
    vertical: 1,
    horizontal: 1
  }
}
export default Tips;