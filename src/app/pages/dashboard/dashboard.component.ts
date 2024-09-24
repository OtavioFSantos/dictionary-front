import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { WordService } from '../../services/word/word.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  wordList: any[] = [];
  page: number = 1;
  selectedWord: any;
  totalPages: number = 0;
  isLoading: boolean = false;

  @ViewChild('content', { static: false }) content!: ElementRef;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.loadWords();
  }

  ngAfterViewInit() { }

  loadWord(word: string) {
    this.selectedWord = undefined
    this.wordService.getWordInfo(word).subscribe(response => {
      this.selectedWord = response[0];
      console.log(this.selectedWord)
    })
  }

  loadWords() {
    this.isLoading = true;
    this.wordService.getWords(this.page).subscribe(response => {
      this.wordList = [...this.wordList, ...response.results];
      this.totalPages = response.totalPages;
      this.page++;
      this.isLoading = false;
    });
  }

  getAudioUrl(phonetics: any[]): string | null {
    for (const phonetic of phonetics) {
      if (phonetic.audio) {
        return phonetic.audio;
      }
    }
    return null;
  }

  onScroll() {
    if (this.content) {
      const content = this.content.nativeElement;
      if (content.scrollTop + content.clientHeight >= content.scrollHeight) {
        this.loadWords();
      }
    }
  }
}
