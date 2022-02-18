import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import { RecipeService } from "../services/recipe.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private recipeService: RecipeService, private authService: AuthService) { }

    ngOnInit(): void { 
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user; 
        });
    }

    onSaveData() {
        this.recipeService.storeRecipes();
    }

    onFetchData() {
        this.recipeService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}