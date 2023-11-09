from django import template

register = template.Library()

@register.filter(name='split')
def split(value, char):
    return str(value).split(char)


@register.filter(name='strip')
def split(value):
    return str(value).strip()
