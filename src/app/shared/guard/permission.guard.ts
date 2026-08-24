import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { selectPermissionsState } from 'src/app/store/selectors/permission.selectors';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {

    constructor(
        private store: Store,
        private router: Router,
        private messageService: MessageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const required = route.data['requiredPermission'] as string | string[] | undefined;
        const anyOf = route.data['requiredAny'] as string[] | undefined;
        const allOf = route.data['requiredAll'] as string[] | undefined;
        const componentName = route.data['breadcrumb'] || 'this page';

        if (!required && !anyOf && !allOf) {
            return of(true);
        }

        return this.store.select(selectPermissionsState).pipe(
            filter(state => state.loaded === true),
            take(1),
            map(state => {
                const userHas = state.userHasPermission;
                const allowed = this.evaluateAccess(userHas, required, anyOf, allOf);

                if (!allowed) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Access Denied',
                        detail: `Access denied. ${componentName} requires ${this.describeRequirement(required, anyOf, allOf)} permission.`,
                        life: 5000
                    });
                }

                return allowed;
            })
        );
    }

    private evaluateAccess(
        userHas: Map<string, boolean>,
        required?: string | string[],
        anyOf?: string[],
        allOf?: string[]
    ): boolean {
        if (required) {
            return Array.isArray(required)
                ? required.some(permission => this.evaluatePermissionExpression(permission, userHas))
                : this.evaluatePermissionExpression(required, userHas);
        }

        if (anyOf) {
            return anyOf.some(permission => this.evaluatePermissionExpression(permission, userHas));
        }

        if (allOf) {
            return allOf.every(permission => this.evaluatePermissionExpression(permission, userHas));
        }

        return true;
    }

    private evaluatePermissionExpression(expression: string, userHas: Map<string, boolean>): boolean {
        const tokens = expression.match(/\|\||&&|\(|\)|[^|&()\s]+/g);

        if (!tokens || tokens.length === 0) {
            return false;
        }

        const context = { index: 0 };
        const result = this.parseOr(tokens, userHas, context);

        return result && context.index === tokens.length;
    }

    private parseOr(tokens: string[], userHas: Map<string, boolean>, context: { index: number }): boolean {
        let result = this.parseAnd(tokens, userHas, context);

        while (tokens[context.index] === '||') {
            context.index += 1;
            const rightSide = this.parseAnd(tokens, userHas, context);
            result = result || rightSide;
        }

        return result;
    }

    private parseAnd(tokens: string[], userHas: Map<string, boolean>, context: { index: number }): boolean {
        let result = this.parsePrimary(tokens, userHas, context);

        while (tokens[context.index] === '&&') {
            context.index += 1;
            const rightSide = this.parsePrimary(tokens, userHas, context);
            result = result && rightSide;
        }

        return result;
    }

    private parsePrimary(tokens: string[], userHas: Map<string, boolean>, context: { index: number }): boolean {
        const token = tokens[context.index];

        if (!token) {
            return false;
        }

        if (token === '(') {
            context.index += 1;
            const result = this.parseOr(tokens, userHas, context);

            if (tokens[context.index] !== ')') {
                return false;
            }

            context.index += 1;
            return result;
        }

        if (token === ')' || token === '||' || token === '&&') {
            return false;
        }

        context.index += 1;
        return userHas.get(token) === true;
    }

    private describeRequirement(required?: string | string[], anyOf?: string[], allOf?: string[]): string {
        if (required) {
            return Array.isArray(required) ? `[${required.join(', ')}]` : `'${required}'`;
        }

        if (anyOf) {
            return `one of [${anyOf.join(', ')}]`;
        }

        if (allOf) {
            return `all of [${allOf.join(', ')}]`;
        }

        return 'unknown';
    }

    private getRedirectPath(): string {
        const url = this.router.url;
        const segments = url.split('/').filter(s => s);
        const module = segments.length > 1 ? segments[1] : 'default';
        return `/home/${module}/forbidden-access`;
    }
}