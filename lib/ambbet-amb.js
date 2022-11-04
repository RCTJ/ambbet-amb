'use babel';

import AmbbetAmbView from './ambbet-amb-view';
import { CompositeDisposable } from 'atom';

export default {

  ambbetAmbView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ambbetAmbView = new AmbbetAmbView(state.ambbetAmbViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ambbetAmbView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ambbet-amb:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ambbetAmbView.destroy();
  },

  serialize() {
    return {
      ambbetAmbViewState: this.ambbetAmbView.serialize()
    };
  },

  toggle() {
    console.log('AmbbetAmb was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
