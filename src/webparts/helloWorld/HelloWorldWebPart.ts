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

export interface IHelloWorldWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.helloWorld}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
              <span class="${ styles.title}">Webpart customizada do Ikaro</span>
              <p class="${ styles.subTitle}">Só Alegria</p>
              <p class="${ styles.description}">${escape(this.properties.description)}</p>
              <a href="https://ikaroamorim.github.io/" class="${ styles.button}">
                <span class="${ styles.label}">O Site que vai mudar sua vida!!</span>
              </a>
              <p class="${ styles.description}">${escape(this.properties.test)}</p>
              <p class="${ styles.description}">${this.properties.test1}</p>
              <p class="${ styles.description}">${escape(this.properties.test2)}</p>
              <p class="${ styles.description}">${this.properties.test3}</p>
            </div>
          </div>
        </div>
      </div>`;
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
                PropertyPaneToggle('test3',{
                  label: 'Está com fome',
                  onText: 'Sim',
                  offText:'Com Certeza'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
