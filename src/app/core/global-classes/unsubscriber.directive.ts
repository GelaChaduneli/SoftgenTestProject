import { Directive, OnDestroy } from "@angular/core"
import { Subscription } from "rxjs"

@Directive()
export abstract class UnsubscriberClass implements OnDestroy {

    subscription$: Subscription = new Subscription()


    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}