import logo from './assets/logo-pokemon.png'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import './App.css'
import React from 'react'
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: {
        name: '',
        imageUri: '',
        description: ''
      },
      value: ''
    }
    this.searchPokemonOnChange = this.searchPokemonOnChange.bind(this)
  }

  searchPokemonOnChange(event) {
    this.setState({
      value: event.target.value
    }, () => {
      axios.get('http://localhost:8000/pokemon/' + this.state.value).then(res => {
        this.setState({
          pokemon: res.data
        })
      }).catch(e => {
        this.setState({
          pokemon: {
            name: '',
            imageUri: '',
            description: "I don't know this pokemon"
          }
        })
      })
    })

  }
  render() {
    return (
      <div className='app' style={{ backgroundColor: '#003a70', height: '100vh', textAlign: 'center' }} >
        <img src={logo} alt='logo pokemon' width='20%' height='15%' />
        <Card className="pokedex">
          <Card.Body>
            <Card.Header>Pokedex</Card.Header>
            <Form.Label>Pokemon ID</Form.Label>
            <Form.Control placeholder='1, 2, 3...' value={this.state.value} onChange={this.searchPokemonOnChange} />
            <img src={this.state.pokemon.imageUri} />
            {this.state.pokemon.name.charAt(0).toUpperCase() + this.state.pokemon.name.slice(1)}<br />
            {this.state.pokemon.description}
          </Card.Body>
        </Card>
      </div >
    )
  }
}

export default App;
