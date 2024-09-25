import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { WordService } from '../../services/word/word.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  wordList: any[] = [];
  historyList: any[] = [];
  favoritesList: any[] = [];
  pageWords: number = 1;
  pageHistory: number = 1;
  pageFavorites: number = 1;
  favorite: boolean = false;
  selectedTab: number = 1;
  selectedWord: any;
  totalPagesWords: number = 0;
  totalPagesHistory: number = 0;
  totalPagesFavorites: number = 0;
  isLoading: boolean = false;
  searchText: string = '';

  @ViewChild('content', { static: false }) content!: ElementRef;
  @ViewChild('contentHistory', { static: false }) contentHistory!: ElementRef;
  @ViewChild('contentFavorites', { static: false }) contentFavorites!: ElementRef;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.loadWords();
    this.loadHistory();
    this.loadFavorites();
  }

  ngAfterViewInit() { }

  loadWord(word: string) {
    this.wordService.getWordInfo(word).subscribe(response => {
      this.selectedWord = response[0];
      this.favorite = this.favoritesList.some(favorite => favorite.word === this.selectedWord.word)
    })
  }

  loadWords() {
    this.wordService.getWords(this.pageWords, this.searchText).subscribe(response => {
      this.wordList = [...this.wordList, ...response.results];
      this.totalPagesWords = response.totalPages;
      this.pageWords++;
    });
  }

  loadHistory() {
    this.wordService.getHistory(this.pageHistory).subscribe(response => {
      this.historyList = [...this.historyList, ...response.results];
      this.totalPagesHistory = response.totalPages;
      this.pageHistory++;
    });
  }

  loadFavorites() {
    this.wordService.getFavorites(this.pageFavorites).subscribe(response => {
      this.favoritesList = response.results;
      this.totalPagesFavorites = response.totalPages;
      this.pageFavorites++;
      if (this.selectedWord) {
        this.loadWord(this.selectedWord.word)
      }
    });
  }

  favoriteWord(word: string) {
    if (!this.favorite) {
      this.wordService.favoriteWord(word).subscribe(response => {
        this.pageFavorites = 1;
        this.loadFavorites();
      })
    } else {
      this.wordService.unfavoriteWord(word).subscribe(response => {
        this.pageFavorites = 1;
        this.loadFavorites();
      })
    }
  }

  selectTab(tab: number): void {
    this.selectedTab = tab;
  }

  getAudioUrl(phonetics: any[]): string | null {
    for (const phonetic of phonetics) {
      if (phonetic.audio) {
        return phonetic.audio;
      }
    }
    return null;
  }

  onSearchChange() {
    this.wordService.getWords(1, this.searchText).subscribe(response => {
      this.wordList = [...response.results];
    });
  }

  onScroll() {
    if (this.content) {
      const content = this.content.nativeElement;
      if (content.scrollTop + content.clientHeight >= content.scrollHeight) {
        this.loadWords();
      }
    }
  }

  onScrollHistory() {
    if (this.contentHistory) {
      const content = this.contentHistory.nativeElement;
      if (content.scrollTop + content.clientHeight >= content.scrollHeight) {
        this.loadHistory();
      }
    }
  }

  onScrollFavorites() {
    if (this.contentFavorites) {
      const content = this.contentFavorites.nativeElement;
      if (content.scrollTop + content.clientHeight >= content.scrollHeight) {
        this.loadFavorites();
      }
    }
  }
}
