import{ Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'multi'})
export class MultiPipe implements PipeTransform{
	transform(value: any, arg?: number): any { 
		let result: string = '';
		if(arg > 0){
			while(arg > 0){
				result += value + '-' + arg + ' ';
				arg--;
			}
		}
		return result;
	}
}