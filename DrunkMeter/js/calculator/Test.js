import Calculator from './Calculator';
import PersonData from './PersonData';
import Alcohol from './Alcohol';

export default class Test {
    test() {
        var personData = new PersonData(77, 'male');
        var drunkAlcohol = [
            new Alcohol(2478, 5)
        ];

        var calculator = new Calculator(personData, drunkAlcohol, null, null);
    }
}
