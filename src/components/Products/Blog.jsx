import React from 'react';
import { Card,CardContent, Typography} from '@material-ui/core';

import useStyles from './Product/mystyles';


const Blog = () => {
    const classes = useStyles();
     

  return (
    <>
     <Card className={classes.root}>
            
            <CardContent >
                <div className={classes.cardContent}>
                
                </div>
                
                
            </CardContent>
         </Card>

    <Card className={classes.root}>
            
            <CardContent >
                <div className={classes.cardContent}>
                <Typography  variant='h5'style={{justifyContent: "center"}}>
                SCRIPTURE OF THE DAY NEWSLETTER
                   
                    <Typography  variant='h5' style={{justifyContent: "center"}}>
                    Inspiration in your inbox, daily.
                  

                <Typography  variant='h7' color="textSecondary" style={{justifyContent: "center"}}><br />
                    Sign up today for the free Scripture of the Day newsletter, 
                    and start receiving daily Bible verses with commentary to help you start your day right.
                                   </Typography>
                                   </Typography>
                                   </Typography>
                </div>
                
                
            </CardContent>
         </Card>

    </>
        
         
         
  )
}

export default Blog;