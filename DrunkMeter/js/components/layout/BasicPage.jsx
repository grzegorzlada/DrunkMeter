import React from 'react';
import Header from './Header';
import Drawer from './Drawer';

export default class BasicPage extends React.Component {

    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer">
                <Header title={this.props.children.props.route.title} />
                <Drawer />
                <main className="mdl-layout__content mdl-color--grey-100">
                    <div className="page-content">
                        {this.props.children}
                    </div>
                </main>
            </div>
        );
    }
}
