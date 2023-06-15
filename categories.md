---
layout: page
title: Categories
---

<ul>
{% for tag in site.tags %}
  <li><a name="{{ tag | first }}">{{ tag | first }}</a>
    <ul>
    {% for post in tag.last %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
    </ul>
  </li>
{% endfor %}
</ul>
