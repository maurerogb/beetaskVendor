import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'app-businesshour',
    imports: [DropdownModule, FormsModule,ToggleSwitchModule, CommonModule, DateFilterComponent],
    templateUrl: './businesshour.component.html',
    styleUrl: './businesshour.component.scss'
})
export class BusinesshourComponent {
toggleProduct(arg0: any) {
throw new Error('Method not implemented.');
}
    days = [
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday"
    ];

    dayRanges: string[] = [];
    selectedRange: string | null = null;

    businessHours: string[] = [];
    selectedHours: string | null = null;
product: any;

    ngOnInit() {
        this.generateBusinessHourRanges();
        this.buildDayRanges();
    }
    buildDayRanges() {
        for (let i = 0; i < this.days.length; i++) {
            for (let j = i; j < this.days.length; j++) {
                this.dayRanges.push(`${this.days[i]} - ${this.days[j]}`);
            }
        }
    }
    generateBusinessHourRanges() {
        const startTimes = this.generateTimes(6, 12);   // 6am–12pm
        const endTimes = this.generateTimes(15, 23);    // 3pm–11pm

        for (let start of startTimes) {
            for (let end of endTimes) {
                if (end.raw > start.raw) {
                    this.businessHours.push(`${start.label} - ${end.label}`);
                }
            }
        }
    }

    generateTimes(startHour: number, endHour: number) {
        const results: { raw: number; label: string }[] = [];

        for (let h = startHour; h <= endHour; h++) {
            const period = h < 12 ? 'am' : 'pm';
            const displayHour = h % 12 === 0 ? 12 : h % 12;

            results.push({
                raw: h,
                label: `${displayHour}${period}`
            });
        }

        return results;
    }
}
