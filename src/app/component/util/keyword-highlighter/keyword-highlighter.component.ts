import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {PickerComponent} from '@ctrl/ngx-emoji-mart';
import {EmojiModule} from '@ctrl/ngx-emoji-mart/ngx-emoji';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-keyword-highlighter',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PickerComponent,
    EmojiModule
  ],
  templateUrl: './keyword-highlighter.component.html',
  styleUrl: './keyword-highlighter.component.scss'
})
export class KeywordHighlighterComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('keywordHighlighterComponent') textarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('overlayDiv') overlayDiv!: ElementRef<HTMLDivElement>;

  @Input() message: string = '';
  @Output() messageChange = new EventEmitter<string>();
  @Input() height: number = 300;
  @Input() showEmojiOption: boolean = true;
  highlightedText: SafeHtml = '';
  showEmojiPicker = false;
  selectedEmojiSet = 'facebook';
  tagsTemplate: string[] = [
    '#service',
    '#service-msg',
    '#employee-msg',
    '#employee',
    '#employee-email',
    '#employee-phone',
    '#date',
    '#time',
    '#price',
    '#business',
    '#reservation-cancel',
    '#reservation-confirm',
    '#zoom',

    '#služba',
    '#text-služby',
    '#text-zaměstnance',
    '#zaměstnanec',
    '#email-zaměstnance',
    '#telefon-zaměstnance',
    '#datum-rezervace',
    '#čas-rezervace',
    '#cena',
    '#link-zrušení-rezervace',
    '#link-potvrzení-rezervace'
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.updateHighlightedText();
  }

  ngAfterViewInit(): void {
    // Initial sync of styles to ensure perfect alignment
    this.syncStyles();
    // Set up a mutation observer to keep the overlay in sync with the textarea
    this.setupScrollSync();
    
    // Add document click listener to close emoji picker when clicking outside
    document.addEventListener('click', this.onDocumentClick.bind(this));
  }
  
  ngOnDestroy(): void {
    // Remove document click listener when component is destroyed
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }
  
  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  
  addEmoji(emoji: string): void {
    if (!this.textarea || !this.textarea.nativeElement) {
      return;
    }
    
    const textarea = this.textarea.nativeElement;
    const startPos = textarea.selectionStart || 0;
    const endPos = textarea.selectionEnd || 0;
    
    // Store the current focus state
    const wasTextareaFocused = document.activeElement === textarea;
    
    // Insert emoji at cursor position
    this.message = 
      this.message.substring(0, startPos) + 
      emoji + 
      this.message.substring(endPos);
    
    // Update the highlighted text
    this.updateHighlightedText();
    this.messageChange.emit(this.message);
    
    // Set cursor position after the inserted emoji
    setTimeout(() => {
      // Only focus if it was focused before
      if (wasTextareaFocused) {
        textarea.focus();
      }
      const newPosition = startPos + emoji.length;
      textarea.selectionStart = newPosition;
      textarea.selectionEnd = newPosition;
      this.syncScroll();
    }, 0);
  }
  
  addEmojiFromPicker(event: any): void {
    if (event && event.emoji) {
      // Get the native emoji character
      const emoji = event.emoji.native;
      this.addEmoji(emoji);
      
      // Keep the emoji picker open after selection
      // No need to set showEmojiPicker = false
    }
  }
  
  // Method to handle clicks outside the emoji picker to close it
  onDocumentClick(event: MouseEvent): void {
    if (!this.showEmojiPicker) {
      return;
    }
    
    const target = event.target as HTMLElement;
    
    // Check if the click is on the emoji button (which toggles the picker)
    if (target.closest('.emoji-button')) {
      return;
    }
    
    // Check if the click is inside the emoji picker
    if (target.closest('emoji-mart') || target.closest('.emoji-mart')) {
      return;
    }
    
    // If we get here, the click was outside both the button and picker
    this.showEmojiPicker = false;
  }

  onInput(): void {
    this.updateHighlightedText();
    this.messageChange.emit(this.message);
    // Ensure scroll position is maintained after input
    this.syncScroll();
  }

  updateHighlightedText(): void {
    const escapedText = this.escapeHtml(this.message);
    // Preserve whitespace exactly as in the textarea
    const highlighted = this.highlightKeywords(escapedText);
    this.highlightedText = this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }

  highlightKeywords(text: string): string {
    if (!text) {
      return '';
    }

    const escapedKeywords = this.tagsTemplate.map((tag) => this.escapeHtml(tag));
    const regexPattern = escapedKeywords.map((tag) => this.escapeRegExp(tag)).join('|');

    if (!regexPattern) {
      return text;
    }

    const regex = new RegExp(`(${regexPattern})`, 'gi');
    return text.replace(regex, `<span class="highlighted-keyword">$1</span>`);
  }

  escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  escapeHtml(str: string): string {
    if (!str) {
      return '';
    }
    
    // Process the string character by character to handle emojis properly
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      
      // Check if this is an emoji (which might be multiple code points)
      if (this.isEmoji(char)) {
        // For emojis, we wrap them in a span with a special class
        result += `<span class="emoji">${char}</span>`;
      } else if (char === '&') {
        result += '&amp;';
      } else if (char === '<') {
        result += '&lt;';
      } else if (char === '>') {
        result += '&gt;';
      } else if (char === '\n') {
        result += '<br>'; // Ensure newlines are preserved
      } else if (/\s/.test(char)) {
        result += '&nbsp;'; // Preserve spaces exactly
      } else {
        result += char;
      }
    }
    
    return result;
  }
  
  // Helper method to check if a character is an emoji
  isEmoji(char: string): boolean {
    // This regex pattern matches most emoji characters
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    return emojiRegex.test(char);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.updateHighlightedText();
    }
  }

  syncScroll(): void {
    if (!this.textarea || !this.textarea.nativeElement) {
      return;
    }

    const textarea = this.textarea.nativeElement;
    const overlay = textarea.nextElementSibling as HTMLElement;

    if (overlay) {
      overlay.scrollTop = textarea.scrollTop;
      overlay.scrollLeft = textarea.scrollLeft;
    }
  }

  private syncStyles(): void {
    if (!this.textarea || !this.textarea.nativeElement) {
      return;
    }

    const textarea = this.textarea.nativeElement;
    const overlay = textarea.nextElementSibling as HTMLElement;

    if (!overlay) {
      return;
    }

    // Ensure the computed styles match exactly
    const textareaStyles = window.getComputedStyle(textarea);

    // Copy all relevant text styling properties
    const propertiesToSync = [
      'font-family', 'font-size', 'font-weight', 'line-height',
      'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'box-sizing', 'border-width', 'letter-spacing', 'word-spacing'
    ];

    propertiesToSync.forEach(prop => {
      const value = textareaStyles.getPropertyValue(prop);
      if (value) {
        overlay.style.setProperty(prop, value);
      }
    });
  }

  private setupScrollSync(): void {
    if (!this.textarea || !this.textarea.nativeElement) {
      return;
    }

    const textarea = this.textarea.nativeElement;

    // Add event listeners for all events that might affect scroll position
    textarea.addEventListener('scroll', () => this.syncScroll());
    textarea.addEventListener('input', () => this.syncScroll());
    textarea.addEventListener('click', () => this.syncScroll());
    textarea.addEventListener('keydown', () => setTimeout(() => this.syncScroll(), 0));
    textarea.addEventListener('keyup', () => this.syncScroll());

    // Handle window resize which might affect layout
    window.addEventListener('resize', () => {
      this.syncStyles();
      this.syncScroll();
    });
  }
}
