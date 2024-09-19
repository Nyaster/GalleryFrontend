import {Component, EventEmitter, Input, input, OnInit, Output, ViewChild} from '@angular/core';
import {TagData, TagifyComponent, TagifyModule, TagifyService, TagifySettings} from "ngx-tagify";
import {BehaviorSubject, debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {FormsModule} from "@angular/forms";
import {query} from "@angular/animations";
import {HttpClient} from "@angular/common/http";
import {AsyncPipe} from "@angular/common";

interface Tag {
  name: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    TagifyModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  constructor(private http: HttpClient, private tagifyService: TagifyService) {

  }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((search: string) => {
      this.getTagsSuggestion(search);
    });
    this.whitelist$.next(this.tagsFromAbove)
    this.tagsFromAbove.forEach((tag: string) => {
      this.tags.push({value: tag})

    })

  }

  @Input() tagsFromAbove!: string[];
  @Output() tagsChange = new EventEmitter<string[]>();


  tags: TagData[] = [];
  // tags = 'foo'; -> if you want to pass as string

  settings: TagifySettings = {
    placeholder: 'Start typing...',
    dropdown: {
      enabled: 1,
      maxItems: 5,
      closeOnSelect: true,
      fuzzySearch: true
    }, enforceWhitelist: true,
    autoComplete: {
      enabled: true,
    },
    callbacks: {
      click: (e) => {
        console.log(e.detail);
      }
    }
  };
  searchSubject = new Subject<string>();
  whitelist$ = new BehaviorSubject<string[]>([]);
  readonly = false;
  disabled = false;

  onAdd(tagify: any) {
    // @ts-ignore
    const test: string[] = tagify.tags.map(x => x.value);
    const newTag = test[test.length - 1];
    this.emitTags(newTag);
  }

  onRemove(tags: any) {
    this.emitTags(null);
  }

  private emitTags(newTag: string | null): void {
    const tagNames = this.tags.map(tag => tag.value);
    if (newTag) {
      tagNames.push(newTag);
    }

    this.tagsChange.emit(tagNames);  // Emit the tag names array
  }

  setInitialTags(tags: string[]) {
    tags.forEach(tag => {
      this.tags.push({value: tag})
    })

  }

  onInputSuggestion($event: string): void {
    if (!$event || $event.length === 0) return;
    this.searchSubject.next($event);
  }

  getTagsSuggestion($event: string) {
    this.http.get<Tag[]>(`http://localhost:5100/api/tags/suggestions?tag=${$event}`)
      .subscribe(suggestions => {
        this.whitelist$.next(suggestions.map(x => x.name));
        this.tagifyService.get("search").dropdown.show();
      })
  }
}
