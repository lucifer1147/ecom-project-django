from django import template

register = template.Library()

@register.filter(name='num_range')
def num_range(value):
    return list(range(value))
