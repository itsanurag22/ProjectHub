from rest_framework import permissions


class IsAdminCheck(permissions.BasePermission):
    """
    Checks if the logged-in user is an admin of the app.
    """
    def has_permission(self, request, view):
        if request.user.admin_check == True:
            return True
        return False


class IsUserAllowed(permissions.BasePermission):
    """
    Checks if the logged-in user is banned or not. If banned returns False else True.
    """
    def has_permission(self, request, view):
        if request.user.banned:
            return False
        return True


class IsProjectMemberOrReadOnly(permissions.BasePermission):
    """
    Checks if the logged-in user is a project member
    Project can be edited by project members and admins only, rest all can view only.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        for person in obj.project_members.all():
            if person == request.user:
                return True
        if request.user == obj.creator:
            return True
        if request.user.admin_check:
            return True
        return False


class IsListMemberOrReadOnly(permissions.BasePermission):
    """
    Checks if the logged-in user is a project member
    List can be edited by project members and admins only, rest all can view only.
    """
        
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        for person in obj.parent_project.project_members.all():
            if person == request.user:
                print(person)
                return True
        if request.user == obj.parent_project.creator:
            return True
        if request.user.admin_check:
            return True
        return False


class IsCardMemberOrReadOnly(permissions.BasePermission):
    """
    Checks if the logged-in user is a project member
    Card can be edited by project members and admins only, rest all can view only.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        for person in obj.parent_list.parent_project.project_members.all():
            if person == request.user:
                return True
        if request.user == obj.parent_list.parent_project.creator:
            return True
        if request.user.admin_check:
            return True
        return False


class DontAllow(permissions.BasePermission):
    """
    Just a permission to deny
    """
    def has_permission(self, request, view):
        return False


class IsCommentor(permissions.BasePermission):
    """
    Checks if the logged-in user is the commentor of a comment
    Comment can be deleted by commentor or admin
    Comment can be edited by commentor only.
    """
    def has_object_permission(self, request, view, obj):
        return obj.commentor == request.user


class IsCommentorOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.commentor == request.user or request.user.admin_check == True:
            return True
        return False











