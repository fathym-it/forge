import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MaskService {
	//  Fields

	//  API Methods
	public RegexMask(value: string, mask: string): string {
		return;
	}

	public SimpleMask(value: string, mask: string): string {
		if (value && mask) {
			var dividers = mask.replace(/\*/g, "").split("");

			dividers.push(" ");

			var maskSet = this.generateSimplePattern(mask);

			return this.formatSimple(value, maskSet.mask, maskSet.placeholderCounts);
		}

		return;
	}

	//  Helpers
	protected generateSimplePattern(mask: string) {
		var placeholderCounts = (mask.match(/\*/g) || []).length;

		for (var i = 0; i < placeholderCounts; i++) {
			mask = mask.replace('*', "{" + i + "}");
		}

		return {
			mask: mask,
			placeholderCounts: placeholderCounts
		};
	}

	private formatSimple(value: string, mask: string, placeholderCounts: number) {
		var formattedString = mask;

		for (var i = 0; i < placeholderCounts; i++) {
			formattedString = formattedString.replace("{" + i + "}", value.charAt(i));
		}

		return formattedString;
	}
}