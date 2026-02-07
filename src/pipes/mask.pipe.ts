import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {
  transform(value: string, start = 3, end = 3, maskChar = '*'): string {
    if (!value || value.length <= start + end) return value;

    const visibleStart = value.slice(0, start);
    const visibleEnd = value.slice(-end);
    const maskedSection = maskChar.repeat(value.length - (start + end));

    return `${visibleStart}${maskedSection}${visibleEnd}`;
  }
}
