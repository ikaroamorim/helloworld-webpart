import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';
import MockHttpClient from './MockHttpClient';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library'

export interface IHelloWorldWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}

export interface ISPLists{
  value: ISPList[];
}

export interface ISPList{
  Title: string;
  Id: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  private _renderListAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local){
      this._getMockListData().then((response) =>{
        this._renderList(response.value);
      });
    }
    else if (Environment.type === EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint){
      this._getListData().then((response)=>{
        this._renderList(response.value);
      })
    }
  }

  private _renderList(items: ISPList[]) : void{
    let html: string = '';
    items.forEach((item: ISPList) => {
      html += `
        <ul class="${styles.list}">
          <li class="${styles.listItem}">
            <span class"ms-font-l">${item.Title}</span>
          </li>
        </ul>`
    });

    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }

  private _getListData(): Promise<ISPLists>{
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) =>{
        return response.json();
      })
  }

  private _getMockListData() : Promise<ISPLists> {
    return MockHttpClient.get().
    then((data: ISPList[]) => {
      var listData: ISPLists = { value: data};
      return listData;
    }) as Promise<ISPLists>;
  }

  public render(): void {

    this.domElement.innerHTML = `
      <div class="${ styles.helloWorld}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
              <span class="${ styles.title}">Webpart customizada do Ikaro</span>
              <p class="${ styles.subTitle}">Só Alegria</p>
              <p class="${ styles.description}">${escape(this.properties.description)}</p>
              <p class="${ styles.description}">${escape(this.properties.test)}</p>
              <p class="${ styles.description}">${this.properties.test1}</p>
              <p class="${ styles.description}">${escape(this.properties.test2)}</p>
              <p class="${ styles.description}">${this.properties.test3}</p>
              <a href="https://ikaroamorim.github.io/" class="${ styles.button}">
                <span class="${ styles.label}">O Site que vai mudar sua vida!!</span>
              </a>
              <p class="${ styles.description}">context.pageContext.user.displayName: ${escape(this.context.pageContext.user.displayName)}</p>
              <p class="${ styles.description}">context.pageContext.web.title: ${escape(this.context.pageContext.web.title)}</p>
            </div>
          </div>
          <div id="spListContainer" />
        </div>
      </div>
      `;

      this._renderListAsync();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('test', {
                  label: 'Diga mais sobre você:',
                  multiline: true
                }),
                PropertyPaneCheckbox('test1', {
                  text: 'Concordo em participar da pesquisa'
                }),
                PropertyPaneDropdown('test2', {
                  label: 'Faixa Salarial',
                  options: [
                    { key: '1', text: 'De R$ 0 à R$ 2.000,00' },
                    { key: '2', text: 'De R$ 2.000,00 à R$ 4.000,00' },
                    { key: '3', text: 'De R$ 4.000,00 à R$ 6.000,00' },
                    { key: '4', text: 'De R$ 6.000,00 ou Superior' }
                  ]
                }),
                PropertyPaneToggle('test3', {
                  label: 'Está com fome',
                  onText: 'Sim',
                  offText: 'Com Certeza'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
