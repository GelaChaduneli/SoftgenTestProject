import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  createUpdateModalDisplay: boolean = false;
  deleteModalDisplay: boolean = false;

  isUpdateMode: boolean = false;

  groups: Group[] = [];

  selectedGroup: Group;


  searchFields: { name: string }[] = [
    { name: 'GroupNumber' }, { name: 'GroupName' }
  ]
  searchField: { name: string } = { name: 'GroupNumber' };
  filterValue: Group;


  constructor(private groupService: GroupService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.fillGroupsTable();
  }

  fillGroupsTable() {
    this.groupService.getGroups().subscribe({
      next: res => {
        this.groups = res;
      }
    });
  }

  filterGroup(event) {
    this.groups = this.groups.filter(gr => gr[`${this.searchField.name}`].includes(event.query))
  }

  deleteGroup() {
    this.groupService.deleteGroup(this.selectedGroup.id).subscribe({
      next: res => {
        this.fillGroupsTable();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully deleted!' });
      },
      complete: () => {
        this.selectedGroup = null
        this.deleteModalDisplay = false
      }
    })
  }

  openCreateUpdateGroupModal(isUpdate: boolean, group?: Group) {

    if (isUpdate) {

      this.isUpdateMode = true;
      this.selectedGroup = group;
      this.createUpdateModalDisplay = true;

    } else {

      this.isUpdateMode = false;
      this.createUpdateModalDisplay = true;
    }


  }

  resetFilter() {
    this.filterValue = null;
    this.fillGroupsTable();
  }

  openDeleteConfiramtionModal(group: Group) {
    this.selectedGroup = group;
    this.deleteModalDisplay = true;
  }

  onCreateUpdateModalClose(message) {
    this.createUpdateModalDisplay = false;
    this.selectedGroup = null;
    this.fillGroupsTable();

    switch (message) {
      case 'Successfully Updated': this.messageService.add({
        severity: 'success', summary: 'Success', detail: message
      }); break;
      case 'Successfully Added': this.messageService.add({
        severity: 'success', summary: 'Success', detail: message
      }); break;
      case '': break;
    }
  }

}
