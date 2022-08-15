import { Subscription } from "rxjs"

export function Unsubscriber(runAutoUnsubscription: boolean) {
    return (target) => {

        console.log(target.prototype)

        let subscriptions$: Subscription = new Subscription();

        if (runAutoUnsubscription) {
            const orig = target.prototype.ngOnDestroy
            target.prototype.ngOnDestroy = function () {
                const prototypes = Object.getOwnPropertyNames(target.prototype)
                for (const prop in prototypes) {
                    const pr = target.prototype[prototypes[`${prop}`]]
                    if (typeof pr === 'function') {
                        const fn = pr as Function
                        if (fn.name.includes('Sub$')) {
                            const sub$ = fn.call(this)
                            subscriptions$.add(sub$)
                        }
                    }
                }

                if (subscriptions$) {
                    subscriptions$.unsubscribe()
                }

                orig.apply()
            }
        }


        // if (runAutoUnsubscription) {
        //     const orig = target.prototype.ngOnDestroy
        //     target.prototype.ngOnDestroy = function () {
        //         for (const prop in this) {
        //             const property = this[prop]
        //             if (typeof property?.subscribe === "function") {
        //                 property.unsubscribe()
        //             }
        //         }
        //         orig.apply()
        //     }
        // }
    }
}

