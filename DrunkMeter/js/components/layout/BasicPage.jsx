import React from 'react';
import Header from './Header';
import Drawer from './Drawer';

export default class BasicPage extends React.Component {

    render() {
        return (
            <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <Header title={this.props.children.props.route.title}/>
                <Drawer />
                <main className="mdl-layout__content mdl-color--grey-100">
                    {this.props.children}
                </main>
            </div>
        );
    }
}
