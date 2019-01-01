import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'mask'
})
// The work of the pipe is handled in the tranform method with our pipe's class
export class MaskPipe implements PipeTransform {
	//  Fields
	private placeholderCounts: number;

	//  API Methods
	public transform(value: string, mask: string): string {
		if (value && mask) {
			var dividers = mask.replace(/\*/g, "").split("");

			dividers.push(" ");

			var maskPattern = this.generatePattern(mask);

			return this.format(value, maskPattern);
		}

		return;
	}

	//  Helpers
	protected generatePattern(mask: string) {
		this.placeholderCounts = (mask.match(/\*/g) || []).length;
		for (var i = 0; i < this.placeholderCounts; i++) {
			mask = mask.replace('*', "{" + i + "}");
		}

		return mask;
	}

	private format(value: string, mask: string) {
		var formattedString = mask;

		for (var i = 0; i < this.placeholderCounts; i++) {
			formattedString = formattedString.replace("{" + i + "}", value.charAt(i));
		}

		return formattedString;
	}
}