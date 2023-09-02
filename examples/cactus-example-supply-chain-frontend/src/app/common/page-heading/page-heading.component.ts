import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-page-heading",
  templateUrl: "page-heading.component.html",
  styleUrls: [],
})
export class PageHeadingComponent implements OnInit {
  isDarkMode = false;

  @Input()
  public pageTitle: string;

  ngOnInit() {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    this.isDarkMode = prefersDarkMode.matches;
    prefersDarkMode.addEventListener("change", (mediaQuery) => {
      this.isDarkMode = mediaQuery.matches;
    });
  }
}
