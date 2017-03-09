import Calculator from './Calculator';
import PersonData from './PersonData';
import Alcohol from './Alcohol';

export default class Test {
    test() {
        var personData = new PersonData(85, 180, 'male', 0.5);
        var drunkAlcohol = [
            new Alcohol(700, 12)
        ];

        var calculator = new Calculator(personData, drunkAlcohol, null, null);
        var premiles = calculator.getAlcoholPremiles();
    }
}
