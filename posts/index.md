---
layout: post3
category: notes
language: turkish
title: "Bilişsel çelişki"
cat: notes
cat2: psikoloji
tags:
  - Psikoloji
---

	 {% for post in site.categories.main %}  {% if post.url %}
	
    <tr style=" border-bottom: 1px solid rgba(255, 255, 255, 0.15); ">
      <td>
        <a href="{{ post.url }}" style="color: #fff; text-decoration: none;">{{ post.date | date: "%d-%m-%Y" }}</a>
      </td>
      <td>
        <a href="{{ post.url }}" style="color: #fff; text-decoration: none;">{{ post.title }}</a>
      </td>
      <td>
        <a href="{{ post.url }}" style="color: #fff; text-decoration: none;">{{ post.cat }}</a>
      </td>
      
    </tr>

	   {% endif %}
          {% endfor %}
