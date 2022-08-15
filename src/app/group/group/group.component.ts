import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { Loading } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  createUpdateModalDisplay: boolean = false;

  isUpdateMode: boolean = false;

  groups: Group[] = [];

  selectedGroup: Group;


  searchFields: { name: string }[] = [
    { name: 'GroupNumber' }, { name: 'GroupName' }
  ]
  searchField: { name: string } = { name: 'GroupNumber' };
  filterValue: Group;


  get isLoadingForGet(): boolean {
    return Loading.isLoadingForGet
  }

  constructor(private groupService: GroupService) { }

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
      },
      complete: () => {
        this.selectedGroup = null
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteGroup();
      }
    })
  }

  onCreateUpdateModalClose(message) {
    this.createUpdateModalDisplay = false;
    this.selectedGroup = null;
    this.fillGroupsTable();

    switch (message) {
      case 'Successfully Updated': console.log('Success--->', message); break;
      case 'Successfully Added': console.log('Success--->', message); break;
      case '': break;
    }
  }

}
