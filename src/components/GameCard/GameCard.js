import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './GameCard.css';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const GameCard = (props) => {
    const { name, price, discount, released, image } = props.data;
    const classes = useStyles();
    return (
        <div className="game-card-container">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title=""
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <div className="body-card">
                                <p>{released}</p>
                            </div>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className="d-flex justify-content-around">
                    <div><span className="main-price">${price}</span> <s className="discount-price">${discount}</s></div>
                    <button onClick={()=>props.buyButton()} className="custom-btn">Buy Now</button>
                </CardActions>
            </Card>
        </div>
    );
};

export default GameCard;