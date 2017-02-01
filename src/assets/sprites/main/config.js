module.exports = exp;

var tiles = [
  ['t_empty', 't_grass_flower', 't_grass_top_left', 't_grass_top', 't_grass_top_right'],
  ['t_sign_alfa', 't_tile', 't_grass_left', 't_grass', 't_grass_right'],
  ['t_sign_grass', 't_bridge', 't_grass_bottom_left', 't_grass_bottom', 't_grass_bottom_right'],
  ['t_sign_tile', '', 't_sand_top_left', 't_sand_top', 't_sand_top_right'],
  ['t_sign_bridge', '', 't_sand_left', 't_sand', 't_sand_right'],
  ['t_sign_sand', '', 't_sand_bottom_left', 't_sand_bottom', 't_sand_bottom_right'],
  ['t_fence'],
  ['t_fence_grass'],
  ['t_fence_tile'],
  ['t_fence_bridge'],
  ['t_fence_sand']
];


var exp = {
  id: 'main',
  src: '/assets/sprites/main/main.png',
  animations: [],
  tiles: []
};

var tileW = 16;
var tileH = 16;

for (var row = 0, length = tiles.length; row < length; row++) {
  for (var column = 0, l = tiles[row].length; column < l; column++) {
    if (tiles[row][column]) {
      var tileInfo = {
        id: tiles[row][column],
        origin: {
          x: (column * tileW),
          y: (row * tileH)
        },
        size: {
          width: tileW,
          height: tileH
        }
      };
      exp.tiles.push(tileInfo);
    }
  }
}









exp.animations = [{
  id: 'a_hero_idle',
  frames: [{
    id: '0',
    time: 500,
    origin: {
      x: 81,
      y: 0
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '1',
    time: 500,
    origin: {
      x: 97,
      y: 0
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '2',
    time: 500,
    origin: {
      x: 113,
      y: 0
    },
    size: {
      width: 16,
      height: 16
    }
  }]
}, {
  id: 'a_hero_run_right',
  frames: [{
    id: '0',
    time: 100,
    origin: {
      x: 81,
      y: 17
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '1',
    time: 100,
    origin: {
      x: 97,
      y: 16
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '2',
    time: 100,
    origin: {
      x: 113,
      y: 16
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '3',
    time: 100,
    origin: {
      x: 129,
      y: 16
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '4',
    time: 100,
    origin: {
      x: 145,
      y: 16
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '5',
    time: 100,
    origin: {
      x: 161,
      y: 16
    },
    size: {
      width: 16,
      height: 16
    }
  }]
}, {
  id: 'a_hero_run_left',
  frames: [{
    id: '0',
    time: 100,
    origin: {
      x: 81,
      y: 32
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '1',
    time: 100,
    origin: {
      x: 97,
      y: 32
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '2',
    time: 100,
    origin: {
      x: 113,
      y: 32
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '3',
    time: 100,
    origin: {
      x: 129,
      y: 32
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '4',
    time: 100,
    origin: {
      x: 145,
      y: 32
    },
    size: {
      width: 16,
      height: 16
    }
  }, {
    id: '5',
    time: 100,
    origin: {
      x: 161,
      y: 32
    },
    size: {
      width: 16,
      height: 16
    }
  }]
}];

JSON.stringify(exp, null, '\t')
