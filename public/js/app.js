
class CoffeesList extends React.Component {
  render (){
    return (
      <table>
        <tbody>
        {this.props.coffees.map((coffee, index) => {
          return (

            <tr >
              <td className='list' onClick={()=>

              { this.props.getCoffee(coffee); this.props.toggleState('coffeeShowAvailable', 'coffeesListAvailable')}
              }>
                <img src={coffee.image} alt={coffee.name} />
              </td>
              <td className='coffee' onClick={()=> { this.props.getCoffee(coffee); this.props.toggleState('coffeesListAvailable', 'coffeeAvailable')}}>
                <h3> {coffee.name} </h3>
              </td>
              <td>
                  <button className='small button'
                  onClick={()=>
                  { this.props.getCoffee(coffee); this.props.toggleState('coffeesListAvailable', 'coffeeAvailable')}}
                  >Edit</button>
              </td>
              <td>
                  <button className='alert button small' onClick={() => this.props.deleteCoffee(coffee, index)}>Delete</button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}




class Coffees extends React.Component {
  constructor (props){
  super(props)
  this.state = {
    coffeesListAvailable: true,
    addCoffeeAvailable: false,
    coffeeAvailable: false,
    editCoffeeAvailable: false,
    coffeeShowAvailable: false,
    coffees : [],
    coffee: {}
    }
    this.toggleState = this.toggleState.bind(this)
    this.getCoffee = this.getCoffee.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
    this.deleteCoffee = this.deleteCoffee.bind(this)
    this.handleUpdateSubmit= this.handleUpdateSubmit.bind(this)



  }

  componentDidMount () {
    this.getCoffees();
  }

  deleteCoffee (coffee, index) {
    fetch('recipes/' + coffee.id,
      {
        method: 'DELETE'
      })
      .then(data => {
        this.setState({
          coffees: [
            ...this.state.coffees.slice(0, index),
            ...this.state.coffees.slice(index + 1)
          ]
        })
      })
  }

  handleCreate (coffee) {
    console.log([coffee, ...this.state.coffees])
    this.setState({coffees: [coffee, ...this.state.coffees]})
  }
  handleUpdateSubmit (coffee) {
    console.log(coffee.id)
      fetch('/recipes/'+ coffee.id, {
        body: JSON.stringify(coffee),
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(updatedCoffee => {
          return updatedCoffee.json()
        })
        .then(jsonedCoffee => {
          this.getCoffees()
          this.toggleState('coffeesListAvailable', 'coffeeAvailable')
        })
        .catch(error => console.log(error))

  }



  handleCreateSubmit (coffee) {
    fetch('/recipes', {
      body: JSON.stringify(coffee),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(createdCoffee => {
        return createdCoffee.json()
      })
      .then(jsonedCoffee => {
        this.handleCreate(jsonedCoffee)
        this.toggleState('addCoffeeAvailable', 'coffeesListAvailable')
      })
      .catch(error => console.log(error))
}

  getCoffee( coffee ) {
    this.setState({coffee: coffee})
  }

  getCoffees () {
    fetch('/recipes')
      .then(response => response.json())
      .then(data => {
        this.setState({
          coffees: data
        })
      })
      .catch(error => console.log(error))
  }



  toggleState (st1, st2) {
    // console.log('toggleState function is running')
    console.log(st1, st2)
    this.setState({
      [st1]: !this.state[st1],
      [st2]: !this.state[st2]
    })
  }


  render () {
    return (
      <div className='coffees column'>

        {this.state.coffeesListAvailable ? <button className='success tiny button' onClick={()=>this.toggleState('addCoffeeAvailable', 'coffeesListAvailable')}>Add a Coffee</button> :''}
        {
          this.state.coffeesListAvailable ?
            <CoffeesList
             toggleState={this.toggleState}
             coffees={this.state.coffees}
             getCoffee={this.getCoffee}
             deleteCoffee={this.deleteCoffee}
            /> : ''
        }
        {
          this.state.coffeeShowAvailable ?
            <CoffeeShow
             toggleState={this.toggleState}
             coffee={this.state.coffee}
             getCoffee={this.getCoffee}
            /> : ''
        }
        {
          this.state.addCoffeeAvailable ?
           <CoffeeForm
           test={'test'}
            toggleState={this.toggleState}
            handleCreate={this.handleCreate}
            handleSubmit={this.handleCreateSubmit}
            test2={'test2'}
           /> : ''
         }
         {
   this.state.coffeeAvailable ?
    <Coffee
     toggleState={this.toggleState}
     coffee={this.state.coffee}
     handleSubmit={this.handleUpdateSubmit}
    /> : ''
 }
 <coffeeShow />
      </div>
    )
  }
}



class CoffeeForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      ingredients: '',
      description: '',
      image: '',
      instructions: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount(){
    if(this.props.coffee){
      this.setState({
        name: this.props.coffee.name,
        type: this.props.coffee.type,
        ingredients: this.props.coffee.ingredients,
        description: this.props.coffee.description,
        image: this.props.coffee.image,
        instructions: this.props.coffee.instructions,
        id: this.props.coffee.id
      })
    }
  }
  handleChange (event) {
    this.setState({[event.target.id]: event.target.value})

  }
  handleSubmit (event) {
    event.preventDefault()
    this.props.handleSubmit(this.state)
  }

  render () {
    console.log(this);
    console.log(this.props)
    return (
      <div className='field'>
        <form onSubmit={this.handleSubmit}>
          <label className='label' for='name'>Name</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              id='name'
              onChange={this.handleChange}
              value= {this.state.name}
            />
          </div>
          <label className='label' for='type'>Type</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              onChange={this.handleChange}
              value= {this.state.type}
              id='type'
            />
          </div>
          <label className='label' for='description'>Description</label>
          <div className='control'>
            <textarea
              className='input'
              type='text'
              id='description'
              onChange={this.handleChange}
              value= {this.state.description}
            />
          <label className='label' for='ingredients'>Ingredients</label>
          <div className='control'>
            <input className='input'
              type='text'
              id='ingredients'
              onChange={this.handleChange}
              value= {this.state.ingredients}
            />
          </div>
          </div>
          <label className='label 'for='image'>Image</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              id='image'
              onChange={this.handleChange}
              value= {this.state.image}
            />
          </div>
          <label className='label' for='instructions'>Instructions</label>
          <div className='control'>
            <textarea
              className='input'
              type='text'
              onChange={this.handleChange}
              value= {this.state.instructions}
              id='instructions'

            />
          </div>
          <div className='control'>
            <input className='success button' type='submit' />
          </div>
        </form>
          {!this.state.id ?
          <button className="button" onClick={()=> this.props.toggleState('coffeesListAvailable', 'addCoffeeAvailable')}>Cancel</button> :''}
      </div>
    )
  }
}



class Coffee extends React.Component {
  render () {
    return (
      <div>
        <div className='tile is-ancestor'>
          <div className='tile is-2'>
            <div>
              <img src={this.props.coffee.image} alt={this.props.coffee.name} />
            </div>
          </div>
          <div className='tile is-2'></div>
          <div className='tile'>
            <div className='tile'>
            </div>
          <div className='tile'>
            <button className='tiny button' onClick={()=> this.props.toggleState('coffeesListAvailable', 'coffeeAvailable')}>Back To List</button>
          </div>
          </div>
        </div>
        <CoffeeForm coffee={this.props.coffee}   handleSubmit={this.props.handleSubmit}/>
        <div><button className="button" onClick={()=> this.props.toggleState('coffeesListAvailable', 'coffeeAvailable')}>Cancel</button>
        </div>

      </div>
    )
  }
}




class CoffeeShow extends React.Component {
  render () {
    return (
      <div>
        <div className='tile is-ancestor'>
          <div className='tile is-2'>
            <div className='showImage'>
              <img src={this.props.coffee.image} alt={this.props.coffee.name} />
            </div>
          </div>
          <div ></div>
          <div>
            <div className='show'>
              <h3 className='tile '>{this.props.coffee.name} </h3>
              <p className='tile is-child '>{this.props.coffee.type} </p>
              <p className='tile is-child '>{this.props.coffee.description} </p>
              <p className='tile is-child '><span>Ingredients: </span> {this.props.coffee.ingredients} </p>
              <p className='tile is-child '><span>Instructions: </span> {this.props.coffee.instructions} </p>

            </div>
            <div className='tile'>
            </div>
          <div className='tile'>
            <button className='button' onClick={()=> this.props.toggleState('coffeeShowAvailable', 'coffeesListAvailable')}>Back To List</button>

          </div>
        </div>

        </div>
      </div>
    )
  }
}


class Header extends React.Component {
    render () {
      return (
        <div className="header">

          <div className="header-title">

            <h1 className='title'> Lot of Lattes </h1>

          </div>
<img src= '/css/coffee-cup-v2.png'/>
          </div>
      )
    }
  }

  class Footer extends React.Component {
      render () {
        return (
          <footer>
          <img src='/css/images.png'/>
            <div id="foot">
              <div id="creator">
                Created By Kellie Dambroso
              </div>
              </div>
            </footer>
        )
      }
    }


class App extends React.Component {
    render () {
      return (
        <div className='section'>
        <Header />
          <div >
            <Coffees />
          </div>
            <Footer />
          </div>
      )
    }
  }

ReactDOM.render(
    <App />,
    document.querySelector('main')
  )
