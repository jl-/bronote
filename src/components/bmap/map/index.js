import React, { Component } from 'react';
import { uid } from '../../../../utils';


class Bmap extends Component {
  constructor(props, context) {
    super(props, context);
    const id = 'bmap_' + uid();
    this.state = { id };
  }
  componentDidMount() {
    // for offline mock, @TODO: remove
    if (!window.BMap) {
      window.BMap = function() {};
      window.BMap.Map = function() {};
      window.BMap.Point = function(){};
      window.BMap.Map.prototype.enableScrollWheelZoom = function(){};
      window.BMap.LocalCity = function(){};
      window.BMap.LocalCity.prototype.get = function(){};
    }
    // end

    const { onReady, locate, point, level = 16 } = this.props;
    const handleReady = typeof onReady === 'function' ? onReady : function(){};
    const map = this.map = new BMap.Map(this.state.id);
    map.enableScrollWheelZoom(true);

    if (point) {
      this.locate(point, level, location => handleReady(this, map, location));
    } else if (locate) {
      const localCity = new BMap.LocalCity();
      localCity.get(city => {
        const center = city && city.center;
        if (!center) return handleReady(this, map, city);
        this.locate(center, city.level, location => handleReady(this, map, location));
      });
    } else {
      handleReady(this, map);
    }
  }

  locate(point, level, callback) {
    if (!point) return;
    this.map.clearOverlays();
    const finalPoint = point instanceof BMap.Point ? point : new BMap.Point(point.lng, point.lat);
    this.map.centerAndZoom(finalPoint, level);
    this.map.panTo(finalPoint);
    this.map.addOverlay(new BMap.Marker(finalPoint));
    const geoc = new BMap.Geocoder();
    geoc.getLocation(finalPoint, callback);
  }

  render() {
    const { onReady, locate, point, ...props } = this.props;
    return (
      <div id={this.state.id} {...props}></div>
    );
  }
}

export default Bmap;


