module.exports = {
  id: 'test',
  src: '/assets/sprites/anim1.png',
  animations: [{
    id: 'switch_big',
    frames: [{
      id: '0',
      time: 500,
      origin: {
        x: 0,
        y: 0
      },
      size: {
        width: 50,
        height: 50
      }
    }, {
      id: '1',
      time: 500,
      origin: {
        x: 51,
        y: 0
      },
      size: {
        width: 50,
        height: 50
      }
    }]
  }, {
    id: 'switch_small',
    frames: [{
      id: '0',
      time: 500,
      origin: {
        x: 0,
        y: 51
      },
      size: {
        width: 50,
        height: 50
      }
    }, {
      id: '1',
      time: 500,
      origin: {
        x: 51,
        y: 51
      },
      size: {
        width: 50,
        height: 50
      }
    }]
  }],
  tiles: [{
    id: 'empty',
    origin: {
      x: 0,
      y: 45
    },
    size: {
      width: 1,
      height: 1
    }
  }, {
    id: 'static_big',
    origin: {
      x: 0,
      y: 0
    },
    size: {
      width: 50,
      height: 50
    }
  }, {
    id: 'static_big_transp',
    origin: {
      x: 0,
      y: 51
    },
    size: {
      width: 50,
      height: 50
    }
  }, {
    id: 'static_small',
    origin: {
      x: 51,
      y: 0
    },
    size: {
      width: 50,
      height: 50
    }
  }, {
    id: 'static_small_transp',
    origin: {
      x: 51,
      y: 51
    },
    size: {
      width: 50,
      height: 50
    }
  }]
};
