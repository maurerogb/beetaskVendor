import { UpdateAdminUsers } from './../../../../types/user';
import { Component, inject, signal } from '@angular/core';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { FilterComponent } from "@/components/filter";
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from "primeng/table";
import { CancelComponent } from "@/components/cancel";
import { DialogModule } from "primeng/dialog";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { PhoneAutoFormatDirective } from 'src/core/directives/phone-auto-format.directive';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccountService } from 'src/core/services/account.service';
import { GetAdminUsers, GetRole, Roles, User } from '@/types/user';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { from } from 'rxjs';
@Component({
    selector: 'app-admin-users',
    imports: [IconField, ButtonModule, ReactiveFormsModule, IconField,
        ConfirmDialogModule, MultiSelectModule, InputTextModule, InputIcon, InputIcon, DateFilterComponent, PhoneAutoFormatDirective,
        CommonModule, FilterComponent, TableModule, TabsModule, CancelComponent, DialogModule],
    templateUrl: './admin-users.component.html',
    styleUrl: './admin-users.component.scss',
    providers: [ConfirmationService, MessageService]
})
export class AdminUsersComponent {
    userData = signal<GetAdminUsers[]>([])
    showUserForm: boolean = false;
    rolesData = signal<GetRole[]>([])
    selectedRoles!: Roles[];
    userForm: FormGroup | undefined
    userInfo = signal<GetAdminUsers>({})
    fb = inject(FormBuilder)
    accountService = inject(AccountService)
    newUser = signal<boolean>(true)

    constructor(private readonly confirmationService: ConfirmationService,
        private readonly messageService: MessageService) {
        this.userForm = this.fb.group({
            id: new FormControl<string | null>(null),
            uuid: new FormControl<string | null>(null),
            fullName: new FormControl<string | null>(null, Validators.required),
            email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
            phoneNumber: new FormControl<string | null>('', Validators.required),
            userName: new FormControl<string | null>('', Validators.required),
            role: new FormControl<GetRole[] | null>([])
             // Set initial value to null or [] based on your needs
        });

        this.getAllUsers()
    }
    deleteDetails(user: any) {
        this.userInfo.set(user)
        this.confirmationService.confirm({
            header: 'Are you sure?',
            message: 'Please confirm to proceed.',
            accept: () => {
                this.deleteUser()
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }
    deleteUser() {
        let uuid = this.userInfo().uuId
        this.accountService.deleteAdminUser(uuid!).subscribe({
            next: (res: any) => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: res.message });
            }
        })
    }
    getRoles() {
        this.accountService.getRoles().subscribe({
            next: (res: any) => {
                console.log(res);
                this.rolesData.set(res.data)
            }
        })
    }


    getAllUsers() {
        this.accountService.getAllAdminUser().subscribe({
            next: (res: any) => {
                this.userData.set(res.data)
            }
        })
    }

    submitUserForm() {

        // if (this.selectedRoles.length == 0 || !this.selectedRoles) {
        //     return alert("Select Roles for the user")
        // }
        const form = this.userForm?.value;
        let rol: string[] = [];
        form.role.forEach((element: any) => {
            rol.push(element.roleName)
        });

        const data = {
            fullName: form.fullName,
            username: form.userName,
            phoneNumber: form.phoneNumber,
            emailAddress: form.email,
            regSource: 0,
            roles: rol
        }
        this.accountService.registerAdminUser(data).subscribe({
            next: (res: any) => {
                console.log(res);
            }
        })
    }
    showForm() {
        this.showUserForm = true
        this.newUser.set(true)
        this.getRoles();
    }
    closeForm() {
        this.userForm?.reset()
        this.showUserForm = false
    }

    updateUser() {
        const form = this.userForm?.value;
        let rol: string[] = [];

        console.log(form);

        form.role.forEach((element: any) => {
            rol.push(element.roleName)
        });
        const data = {
            id:form.id,
            fullName: form.fullName,
            username: form.userName,
            phoneNumber: form.phoneNumber,
            emailAddress: form.email,
            regSource: 0,
            roles: rol,
            uuid:form.uuid
        }
        this.accountService.updateAdminUser(data).subscribe({
            next: res=> {
                this.userForm?.reset();
                this.showUserForm = false;
            }
        })

    }

    openDetails(user: any) {
        this.getRoles();
        this.showUserForm = true;
        this.userForm?.patchValue({
            id: user.id,
            fullName: user.fullName,
            email: user.emailAddress,
            phoneNumber: user.phoneNumber,
            userName: user.userName,
            uuid:user.uuId
        })
        this.newUser.set(false);
        this.accountService.getUserRoles(user.uuId).subscribe({
            next: (res: any) => {
                console.log(res);
                this.userForm?.patchValue({
                    role: res.data
                });
            }
        })
    }
}
