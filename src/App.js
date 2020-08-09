import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Paper';
import FaceIcon from '@material-ui/icons/Face';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Highlighted = ({text = '', highlight = ''}) => {
  if(highlight==null){
    return <span>{text}</span>
  }
  if (!highlight.trim() || highlight=='' ) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
       {parts.filter(part => part).map((part, i) => (
           regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
       ))}
   </span>
  )
}


class App extends Component {
 //const classes = useStyles();
  constructor(){
    super();

    this.state={
      search:null,
      Information: [],
    };
  }
  componentDidMount() {
    const apiUrl = 'https://mrakm.com/codebuild/fetching.json';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ Information: data}));
  }
  
  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }
 
  render(){
 
    const { Information } = this.state;
    const styleInfo = {
      paddingRight:'10px'
    }
    
  
    const items = Information.filter((data)=>{
      
      if(this.state.search == null)
          return data
      else if(data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.name.toLowerCase().includes(this.state.search.toLowerCase())){
          return data
      }
    }).map(data=>{
      return(
     
         <Grid item md={3}>
        <Card >
      
      <CardActionArea>
        <CardMedia
         className = ' image'
          image={data.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          
           
           <Highlighted text={data.name} highlight={this.state.search}/>
           
      
        
          </Typography>
          <Button style={{marginTop:""}}size="small" color="primary">
        {data.category}
        </Button>
          <Typography variant="body2" color="textSecondary" component="p">

          {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
      </CardActions>
    </Card>
    </Grid>
      )
    })
    //const classes = useStyles();
    return (
      <div>
         <Container fixed>
           
         <Paper elevation={3} style={{marginBottom:'20px',marginTop:'20px',maxWidth:'250px'}}>
      <IconButton type="submit" //className={classes.iconButton} 
      aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
       // className={classes.input}
        placeholder="Search Recepies"
        onChange={(e)=>this.searchSpace(e)}
          />
          </Paper>
      <Grid container spacing={3}>
      {items}
      </Grid>
      </Container>
      </div>
    )
  }
}

export default App;
