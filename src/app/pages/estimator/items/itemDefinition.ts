export class Item {

    id: number;
    itemName: string;
    saveFlag: boolean;
    questions: [{ questionId: number, value: string, weight: number }];

}
