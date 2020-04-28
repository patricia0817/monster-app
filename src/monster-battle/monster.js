class Monster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: {
        name: 'Player1',
        hp: 100,
        attackPower: [],
      },
      player2: {
        name: 'Monster',
        hp: 100,
        attackPower: [],
      },
      winner: '',
      isGameInProgress: true,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleAttack = this.handleAttack.bind(this);
    this.handleSpecialAttack = this.handleSpecialAttack.bind(this);
    this.handleHeal = this.handleHeal.bind(this);
    this.handleGiveUp = this.handleGiveUp.bind(this);
  }

  handleStart() {
    this.setState((prevState) => {
      return {
        player1: {
          name: prevState.player1.name,
          hp: 100,
          attackPower: [],
        },
        player2: {
          name: prevState.player2.name,
          hp: 100,
          attackPower: [],
        },
        winner: '',
        isGameInProgress: true,
      };
    });
  }

  handleAttack(e, multiplier = 1, healPower = 1) {
    const attackPowerPlayer1 =
      Math.floor(Math.random() * 10) * multiplier * healPower;
    const attackPowerPlayer2 = Math.floor(Math.random() * 10) * multiplier;
    this.setState((prevState) => {
      return {
        player1: {
          name: prevState.player1.name,
          hp: prevState.player1.hp - attackPowerPlayer1,
          attackPower: prevState.player1.attackPower.concat([
            attackPowerPlayer1,
          ]),
        },
        player2: {
          name: prevState.player2.name,
          hp: prevState.player2.hp - attackPowerPlayer2,
          attackPower: prevState.player2.attackPower.concat([
            attackPowerPlayer2,
          ]),
        },
        winner:
          prevState.player1.hp - attackPowerPlayer1 <= 0
            ? prevState.player2.name
            : prevState.player2.hp - attackPowerPlayer2 <= 0
            ? prevState.player1.name
            : prevState.winner,
        isGameInProgress:
          prevState.player1.hp - attackPowerPlayer1 <= 0
            ? !prevState.isGameInProgress
            : prevState.player2.hp - attackPowerPlayer2 <= 0
            ? !prevState.isGameInProgress
            : prevState.isGameInProgress,
      };
    });
  }

  handleSpecialAttack() {
    this.handleAttack(null, 5);
  }

  handleHeal() {
    this.handleAttack(null, 1, -1);
  }

  handleGiveUp() {
    alert('Are you sure?');
    this.setState((prevState) => {
      return {
        player1: {
          name: prevState.player1.name,
          hp: prevState.player1.hp,
        },
        player2: {
          name: prevState.player2.name,
          hp: prevState.player2.hp,
        },
        winner: prevState.player2.name,
        isGameInProgress: false,
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.winner.length ? (
          <h1>{this.state.winner} is the winner</h1>
        ) : (
          ''
        )}
        <Player
          playerHP={this.state.player1.hp}
          playerName={this.state.player1.name}
        />
        <Player
          playerHP={this.state.player2.hp}
          playerName={this.state.player2.name}
        />
        <StartControl handleStart={this.handleStart} />
        {this.state.isGameInProgress && (
          <GameControls
            handleAttack={this.handleAttack}
            handleSpecialAttack={this.handleSpecialAttack}
            handleHeal={this.handleHeal}
            handleGiveUp={this.handleGiveUp}
          />
        )}
        <BattleLog
          playerName={this.state.player1.name}
          attackPower={this.state.player1.attackPower}
        />
        <BattleLog
          playerName={this.state.player2.name}
          attackPower={this.state.player2.attackPower}
        />
      </div>
    );
  }
}

class Player extends React.Component {
  render() {
    return (
      <div className='playerContainer'>
        <h2 className='userName'>{this.props.playerName}</h2>
        <div className='healthbar'>
          <p>{this.props.playerHP <= 0 ? 0 : this.props.playerHP}</p>
        </div>
      </div>
    );
  }
}

class StartControl extends React.Component {
  render() {
    return (
      <div className='startControlContainer'>
        <button className='startControl' onClick={this.props.handleStart}>
          Start New Game
        </button>
      </div>
    );
  }
}

class GameControls extends React.Component {
  render() {
    return (
      <div className='gameControlsContainer'>
        <button className='attackControl' onClick={this.props.handleAttack}>
          ATTACK
        </button>
        <button
          className='specialAttackControl'
          onClick={this.props.handleSpecialAttack}
        >
          SPACIAL ATTACK
        </button>
        <button className='healControl' onClick={this.props.handleHeal}>
          HEAL
        </button>
        <button className='giveupControl' onClick={this.props.handleGiveUp}>
          GIVE UP
        </button>
      </div>
    );
  }
}

class BattleLog extends React.Component {
  render() {
    return (
      <div>
        {this.props.attackPower &&
          this.props.attackPower.map((item, index) => (
            <div className='battleLog' key={index}>
              {this.props.playerName} hits for
              <span> {item}</span>
            </div>
          ))}
      </div>
    );
  }
}

ReactDOM.render(<Monster />, document.getElementById('app'));
