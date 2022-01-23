import * as React from "react";
import * as ReactDOM from "react-dom";
import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import * as jQuery from 'jquery';

import * as strings from 'LeftNavigationApplicationCustomizerStrings';
import Navigation from "./LeftNavigation";


/** A Custom Action which can be run during execution of a Client Side Application */
export default class LeftNavigationApplicationCustomizer
  extends BaseApplicationCustomizer<null> {
  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    //Uncomment for floating left navigation.
    // jQuery('.mainContent').before
    //   (
    //     //Adding placeholder for inserting left navigation.
    //     "<div id='LeftSection'><div id='LeftNav'></div>"
    //   );
    // jQuery('.mainContent').css
    //   (
    //     "padding-left", "15%"
    //   );
    // Added to handle possible changes on the existence of placeholders.  
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    this._renderPlaceHolders();
    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this.properties) {
        if (this._topPlaceholder.domElement) {
          const navElement: React.ReactElement<any> = React.createElement(
            Navigation
          );

          ReactDOM.render(navElement, this._topPlaceholder.domElement);
          //Uncomment for floating left navigation.
          //ReactDOM.render(navElement, document.getElementById('LeftNav'));
        }
      }
    }
  }
  private _onDispose(): void {
    console.log('[CustomHeaderFooterApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}