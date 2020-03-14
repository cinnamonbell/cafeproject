package com.revature.cafe.controller;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.cafe.beans.MenuItem;
import com.revature.cafe.services.MenuService;

import antlr.collections.List;

@RestController
@RequestMapping(path="/menu")
@CrossOrigin(origins="http://localhost:4200")
public class MenuController {
	@Autowired
	private MenuService ms;
	
	@GetMapping
	public ResponseEntity <Set<MenuItem>> getMenuItems() {
		return ResponseEntity.ok(ms.getMenuItems());
	}
	
	@PostMapping
	public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem mi) {
		//return ResponseEntity.status(201).body(ms.addMenuItem(mi));
		return ResponseEntity.ok(mi);
	}
	
//	@GetMapping(value = "{id}") //maybe id should be menu_id?
//	public ResponseEntity<MenuItem> getMenuItem(@PathVariable("id") int id){
//		MenuItem mi = ms.getMenuItemById(id);
//		if(mi != null) {
//			return ResponseEntity.ok(mi);
//		}
//		return ResponseEntity.notFound().build();
//	}
	
	@PutMapping(value="{id}") //same deal as above
	public ResponseEntity<MenuItem> updateMenuItem(@PathVariable("id") int id, @RequestBody MenuItem mi) {
		ms.updateMenuItem(mi);
		return ResponseEntity.ok(ms.getMenuItemById(id));
	}
	
	@DeleteMapping(value="{id}")
	public ResponseEntity<Void> deleteMenuItem(@PathVariable("id") int id) {
		ms.addMenuItem(ms.getMenuItemById(id)); //changed to delete because I don't think we need to delete menu items
		return ResponseEntity.noContent().build();
	}

}
