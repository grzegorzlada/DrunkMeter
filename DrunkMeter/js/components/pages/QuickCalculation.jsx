import React from 'react';
import Test from '../../calculator/Test';

export default class QuickCalculation extends React.Component {
    render() {
        var test = new Test();
        test.test();
        return (
            <div>Szybkie liczenie</div>
        )
    }
}
