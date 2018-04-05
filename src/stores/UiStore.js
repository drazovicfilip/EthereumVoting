import { action, observable } from 'mobx';

class UiStore {
  @observable currentDrawer = 'none';
  @observable resultDrawerIndex = 0;
  @observable resultDrawerVoteIndex = 0;
  @observable pollOptions = [{address: "", name: ""}, {address: "", name: ""}];
  @observable name = "";
  @observable description = "";
  @observable minutes = "";
  @observable pollOptionsCount = 2;


  @action.bound
  toggleCreatePollDrawer() {
    if (this.currentDrawer === 'CreatePollDrawer') {
      this.currentDrawer = '';
    } else {
      this.currentDrawer = 'CreatePollDrawer';
    }
  }



  @action.bound
  toggleResultDrawer(i) {
    if (this.currentDrawer === 'ResultDrawer') {
      this.currentDrawer = '';
    } else {
      this.currentDrawer = 'ResultDrawer';
      this.resultDrawerIndex = i;
    }
  }

  @action.bound
  setResultDrawerVoteIndex(i) {
    this.resultDrawerVoteIndex = i;
  }

  @action.bound
  updateName(text){
    this.name = text;
  }

  @action.bound
  updateDescription(text){
    this.description = text;
  }

  @action.bound
  updateMinutes(text){
    this.minutes = text;
  }

  @action.bound
  updatePollOption(i, field, text){
    if (field === 'name'){
      this.pollOptions[i].name = text;
    }
    else{
      this.pollOptions[i].address = text;
    }
  }

  @action.bound
  addPollOption(){
    this.pollOptionsCount++;
    this.pollOptions = this.pollOptions.concat({address: "", name: ""});
  }

  @action.bound
  removePollOption(i) {
    console.log('Deleting index ' + i);
    if (this.pollOptionsCount >= 2){
      this.pollOptionsCount--;
    }
    this.pollOptions.splice(i, 1);
  }


}



export default UiStore;
