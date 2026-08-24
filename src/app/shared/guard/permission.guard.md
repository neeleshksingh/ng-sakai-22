# Permission Guard Usage

Use `PermissionGuard` when a route should open only if the user has the right permission(s).

## Simple cases

### 1. One permission is enough

Use `requiredPermission` when the page needs a single permission.

```ts
{
  path: 'academics/academics-session-list',
  component: AcademicSessionListComponent,
  canActivate: [PermissionGuard],
  data: {
    requiredPermission: 'AcademicSession_View',
    breadcrumb: 'Academic Sessions',
    title: 'Academic Session List'
  }
}
```

### 2. Any one permission is enough

Use `requiredAny` when the user can have one permission from the list.

```ts
{
  path: 'academics/academics-session-manage/:id',
  component: AcademicSessionManageComponent,
  canActivate: [PermissionGuard],
  data: {
    requiredAny: ['AcademicSession_Create', 'AcademicSession_Update'],
    breadcrumb: 'Academic Session Manage',
    title: 'Academic Session Manage'
  }
}
```

### 3. All permissions are required

Use `requiredAll` when the user must have every permission in the list.

```ts
{
  path: 'permissions',
  component: PermissionsComponent,
  canActivate: [PermissionGuard],
  data: {
    requiredAll: ['Permission_View', 'Permission_Create', 'Permission_Update'],
    breadcrumb: 'Permissions',
    title: 'Permissions'
  }
}
```

## Flexible expressions

The guard also supports permission expressions inside `requiredPermission`, `requiredAny`, or `requiredAll`.

Use these operators:

- `||` means OR
- `&&` means AND
- `( )` groups conditions

### 4. Menu plus one of two actions

This means the user must have `AcademicSessionMasters_Menu` and also either `AcademicSession_Create` or `AcademicSession_Update`.

```ts
{
  path: 'academics/academics-session-manage/:id',
  component: AcademicSessionManageComponent,
  canActivate: [PermissionGuard],
  data: {
    requiredAll: [
      'AcademicSessionMasters_Menu',
      'AcademicSession_Create || AcademicSession_Update'
    ],
    breadcrumb: 'Academic Session Manage',
    title: 'Academic Session Manage'
  }
}
```

### 5. More than one condition in one expression

Use parentheses when you want to control the order.

```ts
requiredPermission: "(FeeComponent_Create || FeeComponent_Update) && FeeComponent_View";
```

### 6. Multiple options with grouping

```ts
requiredAll: ["Master_Menu", "(Student_Create || Student_Update) && Student_View"];
```

## Rule of thumb

- Use `requiredPermission` for one permission.
- Use `requiredAny` for a simple OR list.
- Use `requiredAll` for a simple AND list.
- Use `||`, `&&`, and parentheses when the rule is more complex.

## Notes

- Keep permission names exact.
- If an expression is invalid or the user does not have the needed permission, access is denied.
- The guard shows a generic access denied message based on the route breadcrumb.
