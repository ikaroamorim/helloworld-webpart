import { ISPList } from './HelloWorldWebPart';

export default class MockHttpClient {
    private static _items: ISPList[] = [
        { Title: 'Mock List 01', Id: '1' },
        { Title: 'Mock List 02', Id: '2' },
        { Title: 'Mock List 03', Id: '3' }
    ];

    public static get(): Promise<ISPList[]> {
        return new Promise<ISPList[]>((resolve) => {
            resolve(MockHttpClient._items);
        })
    }
}