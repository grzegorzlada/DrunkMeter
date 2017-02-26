import React from 'react';
import {Button, IconButton, Card, CardTitle, CardText, CardActions, CardMenu} from 'react-mdl';

export default class UserProfile extends React.Component {

    render() {
        return (
            <Card shadow={0} style={{width: '100%', margin: 'auto'}}>
                <CardTitle>Twój profil</CardTitle>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...
                </CardText>
            </Card>
        );
    }
}
