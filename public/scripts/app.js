'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Monster = function (_React$Component) {
  _inherits(Monster, _React$Component);

  function Monster(props) {
    _classCallCheck(this, Monster);

    var _this = _possibleConstructorReturn(this, (Monster.__proto__ || Object.getPrototypeOf(Monster)).call(this, props));

    _this.state = {
      player1: {
        name: 'Player1',
        hp: 100,
        attackPower: []
      },
      player2: {
        name: 'Monster',
        hp: 100,
        attackPower: []
      },
      winner: '',
      isGameInProgress: true
    };

    _this.handleStart = _this.handleStart.bind(_this);
    _this.handleAttack = _this.handleAttack.bind(_this);
    _this.handleSpecialAttack = _this.handleSpecialAttack.bind(_this);
    _this.handleHeal = _this.handleHeal.bind(_this);
    _this.handleGiveUp = _this.handleGiveUp.bind(_this);
    return _this;
  }

  _createClass(Monster, [{
    key: 'handleStart',
    value: function handleStart() {
      this.setState(function (prevState) {
        return {
          player1: {
            name: prevState.player1.name,
            hp: 100,
            attackPower: []
          },
          player2: {
            name: prevState.player2.name,
            hp: 100,
            attackPower: []
          },
          winner: '',
          isGameInProgress: true
        };
      });
    }
  }, {
    key: 'handleAttack',
    value: function handleAttack(e) {
      var multiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var healPower = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      var attackPowerPlayer1 = Math.floor(Math.random() * 10) * multiplier * healPower;
      var attackPowerPlayer2 = Math.floor(Math.random() * 10) * multiplier;
      this.setState(function (prevState) {
        return {
          player1: {
            name: prevState.player1.name,
            hp: prevState.player1.hp - attackPowerPlayer1,
            attackPower: prevState.player1.attackPower.concat([attackPowerPlayer1])
          },
          player2: {
            name: prevState.player2.name,
            hp: prevState.player2.hp - attackPowerPlayer2,
            attackPower: prevState.player2.attackPower.concat([attackPowerPlayer2])
          },
          winner: prevState.player1.hp - attackPowerPlayer1 <= 0 ? prevState.player2.name : prevState.player2.hp - attackPowerPlayer2 <= 0 ? prevState.player1.name : prevState.winner,
          isGameInProgress: prevState.player1.hp - attackPowerPlayer1 <= 0 ? !prevState.isGameInProgress : prevState.player2.hp - attackPowerPlayer2 <= 0 ? !prevState.isGameInProgress : prevState.isGameInProgress
        };
      });
    }
  }, {
    key: 'handleSpecialAttack',
    value: function handleSpecialAttack() {
      this.handleAttack(null, 5);
    }
  }, {
    key: 'handleHeal',
    value: function handleHeal() {
      this.handleAttack(null, 1, -1);
    }
  }, {
    key: 'handleGiveUp',
    value: function handleGiveUp() {
      alert('Are you sure?');
      this.setState(function (prevState) {
        return {
          player1: {
            name: prevState.player1.name,
            hp: prevState.player1.hp
          },
          player2: {
            name: prevState.player2.name,
            hp: prevState.player2.hp
          },
          winner: prevState.player2.name,
          isGameInProgress: false
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.winner.length ? React.createElement(
          'h1',
          null,
          this.state.winner,
          ' is the winner'
        ) : '',
        React.createElement(Player, {
          playerHP: this.state.player1.hp,
          playerName: this.state.player1.name
        }),
        React.createElement(Player, {
          playerHP: this.state.player2.hp,
          playerName: this.state.player2.name
        }),
        React.createElement(StartControl, { handleStart: this.handleStart }),
        this.state.isGameInProgress && React.createElement(GameControls, {
          handleAttack: this.handleAttack,
          handleSpecialAttack: this.handleSpecialAttack,
          handleHeal: this.handleHeal,
          handleGiveUp: this.handleGiveUp
        }),
        React.createElement(BattleLog, {
          playerName: this.state.player1.name,
          attackPower: this.state.player1.attackPower
        }),
        React.createElement(BattleLog, {
          playerName: this.state.player2.name,
          attackPower: this.state.player2.attackPower
        })
      );
    }
  }]);

  return Monster;
}(React.Component);

var Player = function (_React$Component2) {
  _inherits(Player, _React$Component2);

  function Player() {
    _classCallCheck(this, Player);

    return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).apply(this, arguments));
  }

  _createClass(Player, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'playerContainer' },
        React.createElement(
          'h2',
          { className: 'userName' },
          this.props.playerName
        ),
        React.createElement(
          'div',
          { className: 'healthbar' },
          React.createElement(
            'p',
            null,
            this.props.playerHP <= 0 ? 0 : this.props.playerHP
          )
        )
      );
    }
  }]);

  return Player;
}(React.Component);

var StartControl = function (_React$Component3) {
  _inherits(StartControl, _React$Component3);

  function StartControl() {
    _classCallCheck(this, StartControl);

    return _possibleConstructorReturn(this, (StartControl.__proto__ || Object.getPrototypeOf(StartControl)).apply(this, arguments));
  }

  _createClass(StartControl, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'startControlContainer' },
        React.createElement(
          'button',
          { className: 'startControl', onClick: this.props.handleStart },
          'Start New Game'
        )
      );
    }
  }]);

  return StartControl;
}(React.Component);

var GameControls = function (_React$Component4) {
  _inherits(GameControls, _React$Component4);

  function GameControls() {
    _classCallCheck(this, GameControls);

    return _possibleConstructorReturn(this, (GameControls.__proto__ || Object.getPrototypeOf(GameControls)).apply(this, arguments));
  }

  _createClass(GameControls, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'gameControlsContainer' },
        React.createElement(
          'button',
          { className: 'attackControl', onClick: this.props.handleAttack },
          'ATTACK'
        ),
        React.createElement(
          'button',
          {
            className: 'specialAttackControl',
            onClick: this.props.handleSpecialAttack
          },
          'SPACIAL ATTACK'
        ),
        React.createElement(
          'button',
          { className: 'healControl', onClick: this.props.handleHeal },
          'HEAL'
        ),
        React.createElement(
          'button',
          { className: 'giveupControl', onClick: this.props.handleGiveUp },
          'GIVE UP'
        )
      );
    }
  }]);

  return GameControls;
}(React.Component);

var BattleLog = function (_React$Component5) {
  _inherits(BattleLog, _React$Component5);

  function BattleLog() {
    _classCallCheck(this, BattleLog);

    return _possibleConstructorReturn(this, (BattleLog.__proto__ || Object.getPrototypeOf(BattleLog)).apply(this, arguments));
  }

  _createClass(BattleLog, [{
    key: 'render',
    value: function render() {
      var _this6 = this;

      return React.createElement(
        'div',
        null,
        this.props.attackPower && this.props.attackPower.map(function (item, index) {
          return React.createElement(
            'div',
            { className: 'battleLog', key: index },
            _this6.props.playerName,
            ' hits for',
            React.createElement(
              'span',
              null,
              ' ',
              item
            )
          );
        })
      );
    }
  }]);

  return BattleLog;
}(React.Component);

ReactDOM.render(React.createElement(Monster, null), document.getElementById('app'));
